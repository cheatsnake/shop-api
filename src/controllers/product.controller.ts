import { Request, Response } from "express";
import { INCORRECT_DATA, ITEM_NOT_FOUND } from "../utils/error.constants";
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

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await productService.findById(id);
            return res.json(product);
        } catch (error) {
            return res.status(400).json({ message: ITEM_NOT_FOUND });
        }
    }

    async findByCategory(req: Request, res: Response) {
        try {
            const { category } = req.params;
            const products = await productService.findByCategory(category);
            return res.json(products);
        } catch (error) {
            return res.status(400).json({ message: ITEM_NOT_FOUND });
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const { id, name, price, category, description, images } = req.body;
            const updatedProduct = await productService.updateById(id, {
                name,
                price,
                category,
                description,
                images,
            });
            return res.json(updatedProduct);
        } catch (error) {
            return res.status(400).json({ message: ITEM_NOT_FOUND });
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await productService.deleteById(id);
            return res.status(200);
        } catch (error) {
            return res.status(400).json({ message: ITEM_NOT_FOUND });
        }
    }
}
