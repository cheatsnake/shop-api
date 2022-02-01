import { ProductController } from "../controllers/product.controller";
import { Router } from "express";

const router = Router();
const productController = new ProductController();

router.post("/product", productController.create);
router.get("/product/:id", productController.findById);
router.get("/product/:category", productController.findByCategory);
router.get("/product", productController.findAll);
router.put("/product/:id", productController.updateById);
router.delete("/product/:id", productController.deleteById);

export { router as productRouter };
