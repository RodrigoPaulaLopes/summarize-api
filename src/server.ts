import express from 'express';
import AppDataSource from './database/data-source';
import 'reflect-metadata';


class Server {

    private app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
    }
    private initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
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
