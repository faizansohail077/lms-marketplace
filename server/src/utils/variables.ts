import dotenv from "dotenv";
dotenv.config();
export const ENV = {
    JWT_SECRET: process.env.JWT_SECRET,
}

export const ERROR_MESSAGE = {
    ALREADY_EXISTS: "Already Exists",
    INVALID_CREDENTIALS: "Invalid Credentials",
    TOKEN_ERROR: "Token Error"
}