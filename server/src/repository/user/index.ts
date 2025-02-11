import { PrismaClient, ROLE } from '@prisma/client'
import { generate_token } from '../../utils/helpers';

const prisma = new PrismaClient()

export const create_user = async (name: string, email: string, password: string) => {
    return await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                name,
                email,
                password,
            },
        });

        try {
            const token = generate_token(user);
            return { ...user, token };
        } catch (error: any) {
            throw new Error(error?.message ? error?.message : "Failed to generate token");
        }
    });
}

export const login_user = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error: any) {
        throw new Error(error.code)
    }
}