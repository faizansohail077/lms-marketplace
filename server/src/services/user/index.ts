
import Joi from "joi"
import bcrypt from 'bcrypt'
import { ERROR_MESSAGE } from "../../utils/variables";
import { generate_token } from "../../utils/helpers";
import { userRepository } from "../../repository/index";

const saltRounds = 10;

export const create_user = async ({ name, email, password }: { name: string, last_name: string, email: string, password: string }) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email().required()
    })

    const { error, value } = schema.validate({ name, email, password });

    if (error) throw new Error(error.details[0].message);

    const hash = await bcrypt.hash(password, saltRounds)
    const user = await userRepository.create_user(value.name, value.email, hash)

   console.log(user,'user')
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword }
}

export const login_user = async (email: string, password: string) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    const { error, value } = schema.validate({ email, password });

    if (error) throw new Error(error.details[0].message);

    const user = await userRepository.login_user(value.email)
    if (!user) throw new Error(ERROR_MESSAGE.INVALID_CREDENTIALS);

    const hash = await bcrypt.compare(password, user.password)
    if (!hash) throw new Error(ERROR_MESSAGE.INVALID_CREDENTIALS);

    const token = generate_token(user);

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token }
}

