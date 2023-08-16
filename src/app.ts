
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { constants } from 'http2';
import { HttpResponse } from './domain/response';
import { userRoutes } from './routes/user.routes';

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'Application is running on port';
  private readonly NOT_FOUND = 'Route does not exist';
  private readonly STATUS_NOT_FOUND = constants.HTTP_STATUS_NOT_FOUND;
  private readonly STATUS_OK = constants.HTTP_STATUS_OK;

  constructor(private readonly port: number) {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/user', userRoutes)
    this.app.get('/', (req: Request, res: Response) => {
      res.status(this.STATUS_OK).send(new HttpResponse(this.STATUS_OK, 'Welcome to the shop'))
    })
    this.app.all('*', (req: Request, res: Response) => {
      res.status(this.STATUS_NOT_FOUND).send(new HttpResponse(this.STATUS_NOT_FOUND, this.NOT_FOUND))
    })
  }

  public listen() {
    this.app.listen(this.port);
    console.log(`${this.APPLICATION_RUNNING} ${this.port}`)
  }
}
