import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { MovementEntity } from './domain/entities/movement.entity';
import { MovementController } from './infrastructure/movement.controller';
import { MovementProviders } from './infrastructure/movement.providers';
import { MovementService } from './infrastructure/movement.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovementEntity, StockEntity])],
  controllers: [MovementController],
  providers: [MovementService, ...MovementProviders],
})
export class MovementModule {}
