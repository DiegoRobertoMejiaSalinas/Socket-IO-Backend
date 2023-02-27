import { StockModule } from './stock/stock.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { databaseConfig as postgresConfig } from './core/database/infrastructure/database.postgres';
import { ConfigModule } from '@nestjs/config';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    StockModule,
    PurchaseModule,
    DatabaseModule.forRoot(postgresConfig),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
