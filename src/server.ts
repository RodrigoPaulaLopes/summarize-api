import express, { NextFunction, Request, Response } from 'express';
import AppDataSource from './database/data-source';
import 'reflect-metadata';
import routes from './routes/routes';
import { errors, isCelebrateError } from 'celebrate';
import AppError from './errors/error';


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
        this.app.use((error: Error | AppError, req: Request, res: Response, next: NextFunction) => {



            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    status: 'error',
                    message: error.message,
                });
            }

            return res.status(500).json({
                status: 'error',
                message: error.message,
            });
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
        const PORT = Number(process.env.PORT) || 3000;
        server.start(PORT);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
