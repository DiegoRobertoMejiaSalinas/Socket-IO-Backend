import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { StockService } from './infrastructure/stock.service';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { GetStockByIdUsecase } from './application/usecases/get-stock-by-id.usecase';
import { StockProviders } from './infrastructure/stock.providers';
import { StockController } from './infrastructure/stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  controllers: [StockController],
  providers: [StockService, ...StockProviders],
  exports: [TypeOrmModule],
})
export class StockModule {}
