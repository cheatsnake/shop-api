import { ParamController } from "../controllers/param.controller";
import { Router } from "express";

const router = Router();
const paramController = new ParamController();

router.post("/param", paramController.create);
router.get("/param/:name", paramController.findByName);
router.get("/param", paramController.findAll);

export { router as paramRouter };
