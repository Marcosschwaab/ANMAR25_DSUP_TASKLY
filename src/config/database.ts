import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Task } from '../entities/Task';
import {Note} from '../entities/Note';

dotenv.config(); 

const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false, 
  logging: false,
  migrations: ['src/migrations/**/*.ts'],
  entities: [Task, Note]
};

export const dataSource = new DataSource(databaseConfig);