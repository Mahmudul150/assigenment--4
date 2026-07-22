import { Request, Response, Router } from "express";
import { gearController } from "./gear.controler";

const router = Router()


router.get('/', gearController.getAllGear);
router.get('/categories/:categoryId',gearController.getGearWithCategory)
router.get("/categories/test", (req:Request, res:Response) => {
  res.json({ message: "categories route working" });
});
router.get('/:id',gearController.getSingelGear)


export const gearRouter = router