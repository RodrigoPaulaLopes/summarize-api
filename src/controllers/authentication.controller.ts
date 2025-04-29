import { Request, Response } from "express";
import userRepository from "../repositories/User.repository";
import { UserService } from "../services/User.service";





class AuthenticationController {

    private readonly userService: UserService
    constructor() {
        this.userService = new UserService(userRepository)
    }

    async signin(req: Request, res: Response) : Promise<any>{
        const {email, password} = req.body

        const token = await this.userService.login({email, password})

        return res.status(200).json({accessToken: token})
    }
    async signup(req: Request, res: Response) : Promise<any>{
        const {email, password, first_name, last_name} = req.body

        const user = await this.userService.create({email, password, first_name, last_name})

        return res.status(201).json({ data: user, message: "User created successfully!" })
    }
}

export default AuthenticationController