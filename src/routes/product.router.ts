import { ProductController } from "../controllers/product.controller";
import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();
const productController = new ProductController();

router.post("/product", adminMiddleware(), productController.create);
router.get("/product/:id", productController.findById);
router.get("/products/:category", productController.findByCategory);
router.get("/products", productController.findAll);
router.put("/product", adminMiddleware(), productController.updateById);
router.delete("/product/:id", adminMiddleware(), productController.deleteById);

export { router as productRouter };
