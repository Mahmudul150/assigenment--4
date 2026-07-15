import { Router } from "express";
import { reviweController } from "./review.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

router.post('/',auth(Role.CUSTOMER),reviweController.reViewsCreate)
router.get('/',reviweController.getReview)

export const reviewRouter = router