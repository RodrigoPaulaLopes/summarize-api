import { Repository } from "typeorm";
import User from "../entities/User.entity";
import AppDataSource from "../database/data-source";



const userRepository: Repository<User> = AppDataSource.getRepository("user")

export default userRepository
