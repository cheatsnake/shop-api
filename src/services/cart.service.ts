import { ErrorHandler } from "../utils/error.handler";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { PRODUCT_NOT_FOUND } from "../utils/error.constants";
import { Cart } from "../entities/cart.entity";

export class CartService {
    async getCart(userId: number) {
        try {
            const user = await User.findOne(userId, { relations: ["cart"] });
            const cartId = user?.cart.id;
            const cart = await Cart.findOne(cartId);
            if (!cart) throw new Error();

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(userId: number, productId = 0, amount = 1) {
        try {
            const product = await Product.findOne({
                where: { id: productId },
            });
            if (!product) throw ErrorHandler.notFound(PRODUCT_NOT_FOUND);

            const user = await User.findOne(userId, { relations: ["cart"] });
            const cartId = user?.cart.id;
            const cart = await Cart.findOne(cartId);
            if (!cart) throw new Error();
            const productIndex = cart.products.findIndex((product) => {
                return product.productId === productId;
            });

            if (amount > 0) {
                productIndex !== -1
                    ? (cart.products[productIndex].amount = amount)
                    : cart.products.push({ productId, amount });
            }
            if (amount <= 0 && productIndex !== -1) {
                cart.products = cart.products.filter((product) => {
                    return product.productId !== productId;
                });
            }

            await cart.save();

            return cart;
        } catch (error) {
            throw error;
        }
    }
}
