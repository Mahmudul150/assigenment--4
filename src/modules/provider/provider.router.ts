import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { ProviderController } from "./provider.controler";

const router = Router();

router.post('/',auth(Role.PROVIDER),ProviderController.providerCreateGear)

router.patch('/update/:id',auth(Role.PROVIDER),ProviderController.providerUpdateGear)

router.delete('/delete/:id',auth(Role.PROVIDER),ProviderController.providerDeleteGear)

router.get("/orders", auth(Role.PROVIDER), ProviderController.ProviderGetOrders);

router.patch( "/orders/:id", auth(Role.PROVIDER),ProviderController.providerUpdateOrderStatus);

export const providerRouter = router;