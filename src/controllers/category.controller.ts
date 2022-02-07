import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";

const categoryService = new CategoryService();

export class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;
            const category = await categoryService.create(name);
            return res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.findAll();
            return res.json(categories);
        } catch (error) {
            next(error);
        }
    }
}
