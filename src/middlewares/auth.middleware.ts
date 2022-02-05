import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UNAUTHORIZED } from "../utils/error.constants";

export function authVerify(req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: UNAUTHORIZED });

        const decodedToken = jwt.verify(token, String(process.env.JWT_SECRET));
        req.body.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({ message: UNAUTHORIZED });
    }
}
