import { StockModule } from './stock/stock.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { databaseConfig as postgresConfig } from './core/database/infrastructure/database.postgres';
import { ConfigModule } from '@nestjs/config';
import { MovementModule } from './movement/movement.module';
@Module({
  imports: [
    StockModule,
    MovementModule,
    DatabaseModule.forRoot(postgresConfig),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
