import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ListStocksUsecase } from 'src/stock/application/usecases/list-stocks.usecase';
import { CreateMovementUsecase } from '../application/usecases/create-movement.usecase';
import { ListMovementsByStockIdUsecase } from '../application/usecases/list-movements-by-stock-id.usecase';
import { CreateMovementDto } from '../domain/dto/create-movement.dto';

@WebSocketGateway(3300, {
  cors: {
    origin: '*',
  },
})
export class MovementGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly createMovementUsecase: CreateMovementUsecase,
    private readonly listStocksUsecase: ListStocksUsecase,
    private readonly listMovementsByStockIdUsecase: ListMovementsByStockIdUsecase,
  ) {}

  @WebSocketServer() server: Server;
  private readonly logger = new Logger(MovementGateway.name);

  afterInit(server: any) {
    this.logger.log('The Gateway has started');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(
      `A new client with ID: ${client.id} has started to communicate`,
    );
  }

  handleDisconnect(client: any) {
    this.logger.log(`The client with ID: ${client.id} finished communication`);
  }

  @SubscribeMessage('join_stock_room')
  joinStockRoom(@ConnectedSocket() client: Socket) {
    client.join('stock_room');
    this.logger.log(`The client with ID: ${client.id} joined the Stock Room`);
  }

  @SubscribeMessage('join_movements_room')
  joinMovementsRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() stockId: string,
  ) {
    //TODO Verificar que el stock exista
    client.join(`room_${stockId}`);
    this.logger.log(
      `The client with ID: ${client.id} joined the Movement Room: room_${stockId}`,
    );
  }

  @SubscribeMessage('leave_stock_room')
  leaveStockRoom(@ConnectedSocket() client: Socket) {
    client.leave('stock_room');
    this.logger.log(`The client with ID: ${client.id} has left the Stock Room`);
  }

  @SubscribeMessage('leave_movement_room')
  leaveMovementRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() stockId: string,
  ) {
    client.leave(`room_${stockId}`);
    this.logger.log(
      `The client with ID: ${client.id} has left the Movement Room: room_${stockId}`,
    );
  }

  @SubscribeMessage('request_movements')
  async requestMovements(
    @ConnectedSocket() client: Socket,
    @MessageBody() stockId: string,
  ) {
    const movements = await this.listMovementsByStockIdUsecase.handle(stockId);
    this.server
      .to(`room_${stockId}`)
      .emit('client_requested_movements', movements);

    this.logger.log(
      `A list of movements has been sent to the Movement Room: room_${stockId}`,
    );
  }

  @SubscribeMessage('request_stocks')
  async requestStocks(@ConnectedSocket() client: Socket) {
    const stocks = await this.listStocksUsecase.handle();
    this.server.to('stock_room').emit('client_requested_stocks', stocks);
  }

  @SubscribeMessage('create_movement')
  async createMovement(@MessageBody() data: CreateMovementDto) {
    await this.createMovementUsecase.handle(data);

    const stocks = await this.listStocksUsecase.handle();
    this.server.to('stock_room').emit('client_requested_stocks', stocks);

    const movements = await this.listMovementsByStockIdUsecase.handle(data.stock_id);
    console.log(movements.data.length);
    this.server.to(`room_${data.stock_id}`).emit('client_requested_movements', movements);
    this.server.emit('client_created_movement', data);
  }
}
