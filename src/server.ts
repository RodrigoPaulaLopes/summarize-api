import express from 'express';
import AppDataSource from './database/data-source';



class Server {

    private app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeDatabase();
    }

    private initializeMiddleware() {
        this.app.use(express.json());
    }
    private initializeDatabase() {
        AppDataSource.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            })
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

const server = new Server();
const PORT = Number(process.env.PORT) || 3000;
server.start(PORT);