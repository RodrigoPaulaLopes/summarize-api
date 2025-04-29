import express, { NextFunction, Response } from 'express';
import AppDataSource from './database/data-source';
import 'reflect-metadata';
import routes from './routes/routes';
import { errors} from 'celebrate';
import dotenv from 'dotenv'
import errorMiddleware from './middleware/error.middleware';
import AppError from './errors/error';

dotenv.config();

class Server {

    private app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorMiddleware();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

    }

    private initializeErrorMiddleware() {
        this.app.use(errors())
        this.app.use((err: Error | AppError, req: any, res: Response, next: NextFunction) => {
            e(err, req, res, next);
        });
    }
    private initializeRoutes() {
        this.app.use('/api/v1/', routes);
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

}

AppDataSource.initialize()
    .then(() => {
        const server = new Server();
        
        const PORT = Number(process.env.API_PORT) || 3000;
        server.start(PORT);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
