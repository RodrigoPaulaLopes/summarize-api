import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/User.service";
import userRepository from "../repositories/User.repository";
import AppError from "../errors/error";
import TokenService from "../services/token.service";



class AuthenticationMiddleware {

    private readonly userService: UserService;
    constructor() {
        this.userService = new UserService(userRepository)
    }
    public async execute(req: Request, res: Response, next: NextFunction) {

        const header = req.headers.authorization;

        if (!header) {
            return next(new AppError("Permission denied", 401));
        }

        const [signature, token] = header.split(" ");

        if (signature !== "Bearer" || !token) {
            return next(new AppError("Permission denied", 401));
        }

        try {
            const payload = TokenService.validate(token);
            const user = await this.userService.show(payload.id)
            console.log(user)
            // req.user = user
            next();
        } catch (error) {
            return next(new AppError("Invalid token" + error, 401));
        }
    }
}
export default AuthenticationMiddleware