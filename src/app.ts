import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'Application is running on port';
  private readonly NOT_FOUND = 'Route does not exist';

  constructor(private readonly port: (number | string) = process.env.SERVER_PORT || 3000) {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/users', (req: Request, res: Response) => { })
    this.app.get('/', (req: Request, res: Response) => res.status(200).send({ message: 'Server is up' }))
    this.app.all('*', (req: Request, res: Response) => res.status(404).send({ message: this.NOT_FOUND }))
  }

  public listen() {
    this.app.listen(this.port);
    console.log(`${this.APPLICATION_RUNNING} ${this.port}`)
  }
}
