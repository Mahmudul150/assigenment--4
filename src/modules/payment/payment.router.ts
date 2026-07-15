import { Router } from "express";
import { paymentController } from "./payment.controler";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const route = Router()

route.post('/create',auth(Role.CUSTOMER),paymentController.createPayment)
route.post('/confirm', paymentController.confirmPayment);
route.get("/", auth(Role.CUSTOMER), paymentController.getPaymentDetails);

route.get("/:id", auth(Role.CUSTOMER), paymentController.getPaymentHistory);

export const paymentRouter = route