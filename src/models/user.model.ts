import Knex from "knex";
import dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config()
const dbPort = env.get('DB_PORT').required().asIntPositive();

export const knex = Knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: dbPort,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});