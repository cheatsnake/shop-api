import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error.handler";
import { UNAUTHORIZED } from "../constants/error.constants";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw ErrorHandler.unauthorized(UNAUTHORIZED);

        const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET));
        req.body.user = decodedToken;

        next();
    } catch (error) {
        next(error);
    }
}
