import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStockDto } from '../domain/dto/create-stock.dto';
import { UpdateStockDto } from '../domain/dto/update-stock.dto';
import { StockService } from './stock.service';

@Controller('stock')
@ApiTags('Stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('list')
  async listStocks() {
    return await this.stockService.listStocks();
  }

  @Get(':id')
  async getStockById(@Param('id') stockId: string) {
    return await this.stockService.getStockById(stockId);
  }

  @Post()
  async createStock(@Body() body: CreateStockDto) {
    return await this.stockService.createStock(body);
  }

  @Put(':id')
  async updateStock(
    @Param('id') stockId: string,
    @Body() body: UpdateStockDto,
  ) {
    return await this.stockService.updateStock(stockId, body);
  }

  @Delete(':id')
  async deleteStock(@Param('id') stockId: string) {
    return await this.stockService.deleteStock(stockId);
  }
}
