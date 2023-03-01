import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStockDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
