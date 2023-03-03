import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { MovementTypeEnum } from '../constants/movement.cst';

export class CreateMovementDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  amount: number;

  @ApiProperty()
  @IsEnum(MovementTypeEnum)
  @IsString()
  @IsNotEmpty()
  type: MovementTypeEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stock_id: string;
}
