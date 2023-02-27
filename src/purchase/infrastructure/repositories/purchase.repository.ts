import { Injectable } from '@nestjs/common';
import { PurchaseEntity } from 'src/purchase/domain/entities/purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseRepository extends Repository<PurchaseEntity> {}
