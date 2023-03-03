import { Injectable } from '@nestjs/common';
import { MovementEntity } from 'src/movement/domain/entities/movement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovementRepository extends Repository<MovementEntity> {}
