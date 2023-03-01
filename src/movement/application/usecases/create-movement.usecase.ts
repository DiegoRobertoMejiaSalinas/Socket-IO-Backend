import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovementDto } from 'src/movement/domain/dto/create-movement.dto';
import { MovementEntity } from 'src/movement/domain/entities/movement.entity';
import { MovementRepository } from 'src/movement/infrastructure/repositories/movement.repository';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { StockRepository } from 'src/stock/infrastructure/repositories/stock.repository';

@Injectable()
export class CreateMovementUsecase {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly _movementRepository: MovementRepository,
    @InjectRepository(StockEntity)
    private readonly _stockRepository: StockRepository,
  ) {}

  async handle(body: CreateMovementDto) {
    try {
      /*
       * First we search for the Stock
       */
      const foundStock = await this._stockRepository.findOne({
        where: {
          id: body.stock_id,
        },
      });

      if (!foundStock) {
        throw new NotFoundException({
          error: {
            message: 'The selected stock does not exist',
            type: 'not_existing_stock',
          },
        });
      }

      this._movementRepository.save({
        stock: {
          id: body.stock_id,
        },
        amount: body.amount,
        type: body.type,
      });

      return {
        success: true,
        message: 'Movement created successfully',
      };
    } catch (e) {
      if (e?.response?.error?.type) throw e;

      throw new InternalServerErrorException({
        error: {
          type: 'error_creating_movement',
          message: 'There was an error creating the movement',
        },
      });
    }
  }
}
