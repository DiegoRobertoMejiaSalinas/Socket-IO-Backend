import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockDto } from 'src/stock/domain/dto/create-stock.dto';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { StockRepository } from 'src/stock/infrastructure/repositories/stock.repository';

@Injectable()
export class CreateStockUsecase {
  constructor(
    @InjectRepository(StockEntity)
    private readonly _stockRepository: StockRepository,
  ) {}

  async handle(body: CreateStockDto) {
    try {
      /*
       * First we look if the Stock already exists with the same entered name
       */
      const foundMatchingStock = await this._stockRepository.findOne({
        where: {
          title: body.title,
        },
      });

      if (foundMatchingStock) {
        throw new ForbiddenException({
          error: {
            type: 'already_existing_stock',
            message: 'It already exists a stock with the same name',
          },
        });
      }

      await this._stockRepository.save({
        title: body.title,
      });

      return {
        success: true,
        message: 'Successfully created new Stock',
      };
    } catch (e) {
      if (e?.response?.error?.type) throw e;

      throw new InternalServerErrorException({
        error: {
          type: 'error_creating_stock',
          message: 'There was a server error creating the stock',
        },
      });
    }
  }
}
