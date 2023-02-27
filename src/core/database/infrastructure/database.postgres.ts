import { IDatabaseConfigAttributes } from '../domain/database.interface';

export const databaseConfig: IDatabaseConfigAttributes = {
  database: process.env.POSTGRES_DB,
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
};
