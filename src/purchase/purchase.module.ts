import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseEntity } from './domain/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseEntity])],
  controllers: [],
  providers: [],
})
export class PurchaseModule {}
