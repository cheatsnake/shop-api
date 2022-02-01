import { Request, Response } from "express";
import {
    INCORRECT_DATA,
    ITEM_NOT_FOUND,
    SERVER_ERROR,
} from "../utils/error.constants";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
    async create(req: Request, res: Response) {
        try {
            const product = await productService.create(req.body);
            return res.json(product);
        } catch (error) {
            return res.status(400).json({ message: INCORRECT_DATA });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await productService.findById(id);
            return res.json(...product);
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

    async findAll(req: Request, res: Response) {
        try {
            const products = await productService.findAll();
            return res.json(products);
        } catch (error) {
            return res.status(400).json({ message: SERVER_ERROR });
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const updatedProduct = await productService.updateById(req.body);
            return res.json(updatedProduct);
        } catch (error) {
            return res.status(400).json({ message: ITEM_NOT_FOUND });
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedProduct = await productService.deleteById(id);
            return res.json(deletedProduct);
        } catch (error) {
            return res.status(400).json({ message: ITEM_NOT_FOUND });
        }
    }
}
