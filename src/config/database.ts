import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); 

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false, 
  logging: true,

});

export default dataSource;