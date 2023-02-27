import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { databaseConfig as postgresConfig } from './core/database/infrastructure/database.postgres';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule.forRoot(postgresConfig),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
