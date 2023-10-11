// import cors from 'cors';
import passport from 'passport';
import { routes } from './routes/routes';
import { userRoutes } from './routes/user.routes';
import { applyPassportStrategy } from './utils/passport.utils';
import express, { Application, Request, Response } from 'express';


export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'Application is running on port';
  
  constructor(private readonly port: number) {
    this.app = express();
    this.middleware();
    this.routes();
  }
  
  private middleware(): void {
    // this.app.use(cors({ origin: '*' }));
    // this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    applyPassportStrategy(passport);
    this.app.use(passport.initialize());
  }

  private routes(): void {
    // this.app.use('/user', userRoutes)
    this.app.use('/', routes)
    this.app.all('*', (req: Request, res: Response) => {
      res.status(404).send('<h1>Route does not exist</h1>')
    })
  }

  public listen() {
    this.app.listen(this.port);
    console.log(`${this.APPLICATION_RUNNING} ${this.port}`)
  }
}
