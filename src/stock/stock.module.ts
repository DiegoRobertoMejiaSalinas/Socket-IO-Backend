import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { StockService } from './infrastructure/stock.service';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  controllers: [],
  providers: [StockService],
  exports: [TypeOrmModule],
})
export class StockModule {}
