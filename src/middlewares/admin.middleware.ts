import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { NO_ACCESS_ALLOWED, UNAUTHORIZED } from "../utils/error.constants";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    id: number;
    email: string;
    role: string;
}

export function adminMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).json({ message: UNAUTHORIZED });

            const decodedToken: DecodedToken = <DecodedToken>(
                jwt.verify(token, String(process.env.JWT_SECRET))
            );

            if (decodedToken.role !== "admin") {
                return res.status(403).json({ message: NO_ACCESS_ALLOWED });
            }
            req.body.user = decodedToken;

            next();
        } catch (error) {
            return res.status(401).json({ message: UNAUTHORIZED });
        }
    };
}
