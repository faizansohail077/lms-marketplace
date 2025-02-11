import jwt from 'jsonwebtoken'
import { ENV } from './variables';
import { User } from '@prisma/client';

export const generate_token = (user: User) => {
    try {
        const token = jwt.sign({
            id: user.id, email: user.email, role: user.role
        }, ENV.JWT_SECRET!, { expiresIn: "1h" });
        return token
    } catch (error: any) {
        console.log(error, 'error')
        throw new Error(error.message ? error.message : `Something went wrong while generating token`)
    }
}