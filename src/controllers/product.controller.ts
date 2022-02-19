import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.create(req.body);
            return res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await productService.findById(id);
            return res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async findByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { category } = req.params;
            const { page, limit } = req.query;
            const products = await productService.findByCategory(
                category,
                Number(page),
                Number(limit)
            );
            return res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, limit } = req.query;
            const products = await productService.findAll(
                Number(page),
                Number(limit)
            );
            return res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedProduct = await productService.updateById(req.body);
            return res.json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedProduct = await productService.deleteById(id);
            return res.json(deletedProduct);
        } catch (error) {
            next(error);
        }
    }
}
