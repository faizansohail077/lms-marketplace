import express, { Express } from "express";
import dotenv from "dotenv";
import { userRouter } from "./api/router/user/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/user', userRouter)

app.use("*", (_, res) => {
  res.status(404).send("404 route not found")
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});