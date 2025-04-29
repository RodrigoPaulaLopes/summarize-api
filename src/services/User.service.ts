import { Repository } from "typeorm";
import User from "../entities/User.entity";
import CreateUser from "../types/User";
import AppError from "../errors/error";
import { hashSync } from "bcrypt";




export class UserService {

    private readonly userRepository: Repository<User>;

    constructor(private readonly repository: Repository<User>) {
        this.userRepository = repository;
    }

    async create({email, password, first_name, last_name}: CreateUser) {

        if(await this.userRepository.findOne({ where: { email } })) {
            throw new AppError("User already exists", 400);
        }
        
        password = hashSync(password, 10);


        const data = {
            email,
            password,
            first_name,
            last_name
        }
        
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

}