import dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();
const DB_PORT = env.get('DB_PORT').required().asIntPositive();

export const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
}