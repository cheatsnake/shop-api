import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authVerify } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/verify", authVerify, userController.verify);

export { router as userRouter };
