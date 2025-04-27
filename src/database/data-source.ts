import { DataSource } from "typeorm"
import { CreateSummarizeTable1745721184412 } from "./migrations/1745721184412-CreateSummarizeTable"
import { Summarize } from "../entities/Summarize.entity"

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_NAME || "summarize_db",
    synchronize: false,
    migrations: [CreateSummarizeTable1745721184412],
    entities: [Summarize],
})



export default AppDataSource