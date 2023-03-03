import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMovementDto } from '../domain/dto/create-movement.dto';
import { MovementService } from './movement.service';

@Controller('movement')
@ApiTags('Movements')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  async createMovement(@Body() body: CreateMovementDto) {
    return await this.movementService.createMovement(body);
  }
}
