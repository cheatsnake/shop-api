import { NextFunction, Request, Response } from "express";
import { generateJwt } from "../utils/jwt-generator";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await userService.register(req.body);
            return res.status(201).json({ token: token });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await userService.login(req.body);
            return res.json({ token: token });
        } catch (error) {
            next(error);
        }
    }

    async verify(req: Request, res: Response, next: NextFunction) {
        try {
            const token = generateJwt(
                Number(req.body.user.id),
                req.body.user.email,
                req.body.user.role
            );
            return res.json({ token: token });
        } catch (error) {
            next(error);
        }
    }
}
