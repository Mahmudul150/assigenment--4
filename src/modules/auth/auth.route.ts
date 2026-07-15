import { Router } from "express";
import { authController} from "./auth.controler";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const route = Router()

route.post('/register',authController.registerUser )
route.post('/login',authController.loginUser)
route.post('/refresh-token',authController.refreshToken)
route.get('/me',auth(Role.CUSTOMER,Role.PROVIDER,Role.ADMIN),authController.profileUser)

export const authRouter = route