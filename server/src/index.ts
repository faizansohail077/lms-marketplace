import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.findMany()
  res.send({ message: "Express + TypeScript Server edote" ,user});

});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});