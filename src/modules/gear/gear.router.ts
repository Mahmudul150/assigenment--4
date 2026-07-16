import { Router } from "express";
import { gearController } from "./gear.controler";

const router = Router()


router.get('/', gearController.getAllGear);
router.get('/:id',gearController.getSingelGear)
router.get('/category/:id',gearController.getGearWithCategory)

export const gearRouter = router