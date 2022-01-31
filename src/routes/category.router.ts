import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();
const categoryController = new CategoryController();

router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);

export { router as categoryRouter };
