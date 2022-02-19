import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const cartController = new CartController();

router.get("/cart", authMiddleware, cartController.getCart);
router.get("/cart/add/:productId", authMiddleware, cartController.updateCart);

export { router as cartRouter };
