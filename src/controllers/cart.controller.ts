import { NextFunction, Request, Response } from "express";
import { CartService } from "../services/cart.service";

const cartService = new CartService();

export class CartController {
    async getCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: number = req.body.user.id;
            const cart = await cartService.getCart(userId);

            return res.json(cart);
        } catch (error) {
            next(error);
        }
    }

    async updateCart(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: number = req.body.user.id;
            const productId: number = Number(req.params.productId);
            const amount: number = Number(req.query.amount);

            const cart = await cartService.updateCart(
                userId,
                productId,
                amount
            );
            return res.json(cart);
        } catch (error) {
            next(error);
        }
    }
}
