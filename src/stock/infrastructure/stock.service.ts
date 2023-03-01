import { Injectable } from '@nestjs/common';
import { CreateStockUsecase } from '../application/usecases/create-stock.usecase';
import { DeleteStockUsecase } from '../application/usecases/delete-stock.usecase';
import { GetStockByIdUsecase } from '../application/usecases/get-stock-by-id.usecase';
import { ListStocksUsecase } from '../application/usecases/list-stocks.usecase';
import { UpdateStockUsecase } from '../application/usecases/update-stock.usecase';
import { CreateStockDto } from '../domain/dto/create-stock.dto';
import { UpdateStockDto } from '../domain/dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    private readonly _getStockByIdUsecase: GetStockByIdUsecase,
    private readonly _listStocksUsecase: ListStocksUsecase,
    private readonly _deleteStockUsecase: DeleteStockUsecase,
    private readonly _createStockUsecase: CreateStockUsecase,
    private readonly _updateStockUsecase: UpdateStockUsecase,
  ) {}

  async getStockById(stockId: string) {
    return await this._getStockByIdUsecase.handle(stockId);
  }
  async listStocks() {
    return await this._listStocksUsecase.handle();
  }
  async deleteStock(stockId: string) {
    return await this._deleteStockUsecase.handle(stockId);
  }
  async createStock(body: CreateStockDto) {
    return await this._createStockUsecase.handle(body);
  }
  async updateStock(stockId: string, body: UpdateStockDto) {
    return await this._updateStockUsecase.handle(stockId, body);
  }
}
