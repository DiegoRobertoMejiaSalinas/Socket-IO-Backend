import { Injectable } from '@nestjs/common';
import { StockEntity } from 'src/stock/domain/entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockRepository extends Repository<StockEntity> {}
