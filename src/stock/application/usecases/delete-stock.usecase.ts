import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { StockRepository } from 'src/stock/infrastructure/repositories/stock.repository';

@Injectable()
export class DeleteStockUsecase {
  constructor(
    @InjectRepository(StockEntity)
    private readonly _stockRepository: StockRepository,
  ) {}

  async handle(stockId: string) {
    try {
      /*
       * First we look if the Stock already exists with the same entered name
       */
      const foundMatchingStock = await this._stockRepository.findOne({
        where: {
          id: stockId,
        },
      });

      if (!foundMatchingStock) {
        throw new ForbiddenException({
          error: {
            type: 'non_existing_stock',
            message: 'It does not exist the selected stock',
          },
        });
      }

      await this._stockRepository.delete({
        id: stockId,
      });

      return {
        success: true,
        message: 'Successfully deleted Stock',
      };
    } catch (e) {
      if (e?.response?.error?.type) throw e;

      throw new InternalServerErrorException({
        error: {
          type: 'error_deleting_stock',
          message: 'There was a server error deleting the stock',
        },
      });
    }
  }
}
