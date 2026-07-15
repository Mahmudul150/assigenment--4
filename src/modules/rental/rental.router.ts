import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { rentalController } from "./rental.controler";

const router = Router()

router.post('/',auth(Role.CUSTOMER), rentalController.createRental)
router.get('/', auth(Role.ADMIN, Role.CUSTOMER), rentalController.getAllRentals)
router.get('/:id', auth(Role.CUSTOMER), rentalController.getRentalById)

export const rentalRouter = router