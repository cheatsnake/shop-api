import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
    async create(req: Request, res: Response) {
        try {
            const { name, price, description, images } = req.body;
            const product = await productService.create({
                name,
                price: Number(price),
                description,
                images,
            });
            res.json(product);
        } catch (error) {
            return res.status(400).json({ message: "Incorrect data" });
        }
    }
}
