import { Injectable } from '@nestjs/common';
import { CreateMovementUsecase } from '../application/usecases/create-movement.usecase';
import { CreateMovementDto } from '../domain/dto/create-movement.dto';

@Injectable()
export class MovementService {
  constructor(private readonly _createMovementUsecase: CreateMovementUsecase) {}

  async createMovement(body: CreateMovementDto) {
    return await this._createMovementUsecase.handle(body);
  }
}
