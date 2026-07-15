import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { providerService } from "./provider.service";

const providerCreateGear = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const providerId = req.user?.id as string ;
    const payload = req.body;

    

    const gear = await providerService.providerCreateGear(providerId,payload);

    sendResponse(res,{
      success: true,
      statusCode:httpStatus.CREATED,
      message: "create  gear  successfully",
      data: gear
    });
})


const providerUpdateGear =  catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const gearId = req.params.id as string;
    const payload = req.body;
     const providerId = req.user?.id as string ; 
    const result = await providerService.ProviderUpdateGear(gearId,payload,providerId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear updated successfully",
      data: result,
    });
  

})



const providerDeleteGear =  catchAsync(async (req:Request, res:Response,next:NextFunction) => {
       const gearId = req.params.id as string;
        const providerId = req.user?.id as string ; 

    const result = await providerService.ProviderDeleteGear(gearId,providerId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Gear deleted successfully",
      data: null,
    });
})


const ProviderGetOrders = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const providerId = req.user?.id as string;

  const result = await providerService.ProviderGetOrders(providerId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders retrieved successfully",
    data: result,
  });
});


const providerUpdateOrderStatus =  catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    
    const orderId = req.params.id as string;
    const providerId = req.user?.id as string;
     const status = req.body.status
     

    const result = await providerService.providerUpdateOrderStatus(orderId,providerId,status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order status updated successfully",
    data: result,
  });
});

export const ProviderController = {
    providerCreateGear,
    providerUpdateGear,
    providerDeleteGear,
    ProviderGetOrders,
    providerUpdateOrderStatus
}