import { Request, Response } from "express";
import { ParamService } from "../services/param.service";
import {
    INCORRECT_DATA,
    ITEM_NOT_FOUND,
    SERVER_ERROR,
} from "../utils/error.constants";

const paramSerice = new ParamService();

export class ParamController {
    async create(req: Request, res: Response) {
        try {
            const { name, body } = req.body;
            const param = await paramSerice.create(name, body);
            return res.json(param);
        } catch (error) {
            res.status(400).json({ message: INCORRECT_DATA });
        }
    }

    async findByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const params = await paramSerice.findByName(name);
            return res.json(params);
        } catch (error) {
            res.status(400).json({ message: ITEM_NOT_FOUND });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const params = await paramSerice.findAll();
            return res.json(params);
        } catch (error) {
            res.status(400).json({ message: SERVER_ERROR });
        }
    }
}
