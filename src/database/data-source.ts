import { DataSource } from "typeorm"
import { CreateSummarizeTable1745721184412 } from "./migrations/1745721184412-CreateSummarizeTable"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "summarize_db",
    synchronize: false,
    migrations: [CreateSummarizeTable1745721184412],
    entities: []
})



export default AppDataSource