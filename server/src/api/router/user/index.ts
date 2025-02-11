import { Router } from "express";
import { userController } from "../../controller";

const router = Router()

router.post('/create_user', userController.create_user);
router.post('/login_user', userController.login_user);


export { router as userRouter } 