import 'dotenv/config';
import { DataSource } from 'typeorm';

export const ormConfig = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['database/migrations/**/*{.ts,.js}'],
});
