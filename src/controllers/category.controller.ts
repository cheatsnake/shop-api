import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { INCORRECT_DATA, SERVER_ERROR } from "../utils/error.constants";

const categoryService = new CategoryService();

export class CategoryController {
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const category = await categoryService.create(name);
            return res.json(category);
        } catch (error) {
            res.status(400).json({ message: INCORRECT_DATA });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const categories = await categoryService.findAll();
            return res.json(categories);
        } catch (error) {
            res.status(400).json({ message: SERVER_ERROR });
        }
    }
}
