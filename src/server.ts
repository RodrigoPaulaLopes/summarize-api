import express, { NextFunction, Request, Response } from 'express';
import AppDataSource from './database/data-source';
import 'reflect-metadata';
import routes from './routes/routes';


class Server {

    private app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

            res.status((error as any).status || 500).json({
              message: error.message || 'Internal Server Error',
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
