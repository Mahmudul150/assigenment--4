import { Request, Response, Router } from "express";
import { gearController } from "./gear.controler";

const router = Router({ mergeParams: true })

router.get('/categories/:categoryId',gearController.getGearWithCategory);
router.get('/', gearController.getAllGear);
router.get('/:id',gearController.getSingelGear);


export const gearRouter = router