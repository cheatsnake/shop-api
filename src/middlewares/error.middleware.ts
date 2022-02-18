import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { SERVER_ERROR } from "../constants/error.constants";
import { ErrorHandler } from "../utils/error.handler";

export function errorMiddleware(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof ErrorHandler) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: SERVER_ERROR });
}
