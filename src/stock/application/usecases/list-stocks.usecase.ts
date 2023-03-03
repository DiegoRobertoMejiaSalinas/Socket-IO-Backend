import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { StockRepository } from 'src/stock/infrastructure/repositories/stock.repository';

@Injectable()
export class ListStocksUsecase {
  constructor(
    @InjectRepository(StockEntity)
    private readonly _stockRepository: StockRepository,
  ) {}

  async handle() {
    try {
      const foundStocks = await this._stockRepository.find({
        relations: {
          movements: true,
        },
      });

      return {
        success: true,
        data: foundStocks
      }
    } catch (e) {
      if (e?.response?.error?.type) throw e;

      throw new InternalServerErrorException({
        error: {
          type: 'error_listing_stocks',
          message: 'There was an error listing the stocks',
        },
      });
    }
  }
}
