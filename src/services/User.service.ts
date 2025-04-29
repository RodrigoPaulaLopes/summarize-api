import { Repository } from "typeorm";
import User from "../entities/User.entity";
import { CreateUser, Login } from "../types/User";
import AppError from "../errors/error";
import { compare, compareSync, hashSync } from "bcrypt";
import TokenService from "./token.service";




export class UserService {

    private readonly userRepository: Repository<User>;

    constructor(private readonly repository: Repository<User>) {
        this.userRepository = repository;
    }

    async login({ email, password }: Login) {
        const user = await this.userRepository.findOne({ where: { email } })

        if (!user) throw new AppError("Invalid credentials", 400)

        if (!compareSync(password, user.password)) throw new AppError("Invalid credentials", 400)

        const token = TokenService.generate(user)

        return token
    }
    async create({ email, password, first_name, last_name }: CreateUser) {

        if (await this.userRepository.findOne({ where: { email } })) {
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

    async show(id: string) {
        const user = await this.userRepository.findOne({ where: { id } })
        if (!user) throw new AppError("User not found!", 404)

        return user
    }

}