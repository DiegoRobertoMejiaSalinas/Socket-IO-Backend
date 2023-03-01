import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { StockRepository } from 'src/stock/infrastructure/repositories/stock.repository';

@Injectable()
export class GetStockByIdUsecase {
  constructor(
    @InjectRepository(StockEntity)
    private readonly _stockRepository: StockRepository,
  ) {}

  async handle(stockId: string) {
    try {
      const foundMatchingStock = await this._stockRepository.findOne({
        where: {
          id: stockId,
        },
        relations: {
          purchases: true,
        },
      });

      if (!foundMatchingStock) {
        throw new NotFoundException({
          error: {
            type: 'not_found_stock',
            message: 'The selected stock does not exists',
          },
        });
      }

      return {
        success: true,
        data: foundMatchingStock,
      };
    } catch (e) {
      if (e?.response?.error?.type) throw e;

      throw new InternalServerErrorException({
        error: {
          type: 'error_fetching_stock',
          message: 'There was a server error fetching the selected stock',
        },
      });
    }
  }
}
