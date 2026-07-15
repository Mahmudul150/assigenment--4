import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middleware/auth";

const router = Router()



router.get('/', categoryController.getAllCategories);

router.post('/', auth('ADMIN'), categoryController.createCategory);

export const categoryRouter = router