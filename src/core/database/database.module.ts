import { DynamicModule, Module } from '@nestjs/common';
import { IDatabaseConfigAttributes } from './domain/database.interface';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(databaseConfig: IDatabaseConfigAttributes): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          ...databaseConfig,
          type: 'postgres',
          synchronize: true,
          logging: true,
          entities: [
            __dirname + '/../../entities/*.entity.{ts,js}',
            __dirname + '/../../**/domain/entities/*.entity.{ts,js}',
          ],
        }),
      ],
    };
  }
}
