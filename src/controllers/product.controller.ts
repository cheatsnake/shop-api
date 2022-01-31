import { Request, Response } from "express";
import { INCORRECT_DATA } from "../utils/error.constants";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
    async create(req: Request, res: Response) {
        try {
            const { name, price, category, description, images } = req.body;
            const product = await productService.create({
                name,
                category,
                price: Number(price),
                description,
                images,
            });
            return res.json(product);
        } catch (error) {
            return res.status(400).json({ message: INCORRECT_DATA });
        }
    }
}
