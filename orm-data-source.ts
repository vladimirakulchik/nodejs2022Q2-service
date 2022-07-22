import { DataSource } from 'typeorm';
import { ormConfig } from './orm-config';

export const ormDataSource = new DataSource({
  ...ormConfig,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['database/migrations/**/*{.ts,.js}'],
});
