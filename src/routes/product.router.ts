import { ProductController } from "../controllers/product.controller";
import { Router } from "express";

const router = Router();
const productController = new ProductController();

router.post("/product", productController.create);
router.get("/product/:id");
router.get("/product/:category");
router.put("/product/:id");
router.delete("/product/:id");

export { router as productRouter };
