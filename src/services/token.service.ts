import jwt from 'jsonwebtoken'
import User from '../entities/User.entity'
import dotenv from 'dotenv'

dotenv.config()
class TokenService {


    public static generate(user: User): string {
        return jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.SECRET as string, {
            issuer: 'Summarize API',
            expiresIn: '1h'
        })
    }
}

export default TokenService