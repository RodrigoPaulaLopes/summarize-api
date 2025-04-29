import { DataSource } from "typeorm"
import { CreateSummarizeTable1745721184412 } from "./migrations/1745721184412-CreateSummarizeTable"
import { Summarize } from "../entities/Summarize.entity"
import { CreateUserTable1745889423991 } from "./migrations/1745889423991-CreateUserTable"
import User from "../entities/User.entity"
import { AddUserIdReferenceInSummarizeTable1745929975091 } from "./migrations/1745929975091-AddUserIdReferenceInSummarizeTable"
import dotenv from 'dotenv'

dotenv.config()

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    migrations: [
        CreateSummarizeTable1745721184412, 
        CreateUserTable1745889423991, 
        AddUserIdReferenceInSummarizeTable1745929975091
    ],
    entities: [Summarize, User],
})



export default AppDataSource