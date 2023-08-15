import { App } from './app';
import dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();
const httpPort = env.get('SERVER_PORT').required().asIntPositive();

const start = (): void => {
  const app = new App(httpPort);
  app.listen()
}

start();