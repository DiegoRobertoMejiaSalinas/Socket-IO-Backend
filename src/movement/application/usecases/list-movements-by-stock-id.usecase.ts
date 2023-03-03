import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementEntity } from 'src/movement/domain/entities/movement.entity';
import { MovementRepository } from 'src/movement/infrastructure/repositories/movement.repository';

@Injectable()
export class ListMovementsByStockIdUsecase {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly _movementRepository: MovementRepository,
  ) {}

  async handle(stockId: string) {
    try {
      const foundMovements = await this._movementRepository.find({
        where: {
          stock: {
            id: stockId,
          },
        },
        order: {
          id: 'DESC'
        }
      });

      return {
        success: true,
        data: foundMovements,
      };
    } catch (e) {
      if (e?.response?.error?.type) throw e;
      throw new InternalServerErrorException({
        error: {
          type: 'error_listing_movements',
          message: 'There was an error listing the movements',
        },
      });
    }
  }
}
