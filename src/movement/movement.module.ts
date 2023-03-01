import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovementEntity } from './domain/entities/movement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovementEntity])],
  controllers: [],
  providers: [],
})
export class MovementModule {}
