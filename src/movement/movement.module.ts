import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { StockModule } from 'src/stock/stock.module';
import { MovementEntity } from './domain/entities/movement.entity';
import { MovementController } from './infrastructure/movement.controller';
import { MovementGateway } from './infrastructure/movement.gateway';
import { MovementProviders } from './infrastructure/movement.providers';
import { MovementService } from './infrastructure/movement.service';

@Module({
  imports: [StockModule, TypeOrmModule.forFeature([MovementEntity, StockEntity])],
  controllers: [MovementController],
  providers: [MovementService, MovementGateway, ...MovementProviders],
})
export class MovementModule {}
