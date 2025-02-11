import { Request, Response } from 'express';
import { userService } from '../../../services/index';
import { ERROR_MESSAGE } from '../../../utils/variables';

export const create_user = async (req: Request, res: Response) => {
    try {
        const user = await userService.create_user(req.body)
        res.status(200).send({ message: "User Created", ...user })
    } catch (error: Error | any) {
        console.log(error, 'create user')
        if (error.message === "P2002") {
            res.status(500).send({ message: `Email ${ERROR_MESSAGE.ALREADY_EXISTS}` })
        }
        else if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}

export const login_user = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login_user(email, password)
        res.status(200).send({ message: "Welcome back!", ...user })
    } catch (error: Error | any) {
        console.log(error, 'login user controller')
        if (error.message) {
            res.status(500).send({ message: error.message })
        }
        else {
            res.status(500).send({ message: "Something Went Wrong" })
        }
    }
}