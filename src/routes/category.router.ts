import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { CategoryController } from "../controllers/category.controller";

const router = Router();
const categoryController = new CategoryController();

router.post("/category", adminMiddleware(), categoryController.create);
router.get("/category", categoryController.findAll);

export { router as categoryRouter };
