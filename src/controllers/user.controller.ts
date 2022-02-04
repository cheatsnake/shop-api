import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { INCORRECT_DATA } from "../utils/error.constants";

const userService = new UserService();

export class UserController {
    async register(req: Request, res: Response) {
        try {
            const token = await userService.register(req.body);
            return res.json({ token: token });
        } catch (error) {
            res.status(400).json({ message: INCORRECT_DATA });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const user = await userService.login(req.body);
            return;
        } catch (error) {
            res.status(400).json({ message: INCORRECT_DATA });
        }
    }

    async verify(req: Request, res: Response) {}
}
