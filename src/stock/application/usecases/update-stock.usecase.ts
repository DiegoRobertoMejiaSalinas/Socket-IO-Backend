import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStockDto } from 'src/stock/domain/dto/update-stock.dto';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { StockRepository } from 'src/stock/infrastructure/repositories/stock.repository';

@Injectable()
export class UpdateStockUsecase {
  constructor(
    @InjectRepository(StockEntity)
    private readonly _stockRepository: StockRepository,
  ) {}

  async handle(stockId: string, body: UpdateStockDto) {
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

      await this._stockRepository.save({
        id: stockId,
        ...body,
      });

      return {
        success: true,
        message: 'Successfully updated Stock',
      };
    } catch (e) {
      if (e?.response?.error?.type) throw e;

      throw new InternalServerErrorException({
        error: {
          type: 'error_updating_stock',
          message: 'There was an error updating the stock',
        },
      });
    }
  }
}
