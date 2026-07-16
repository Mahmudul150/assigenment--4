import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { paymentService } from "./payment.service";

const createPayment = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const customerId = req.user?.id
    const rentalId = req.body.rentalId
    const result = await paymentService.createPayment(customerId as string , rentalId)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Payment session created successfully",
        data:result
    })
})
  
const confirmPayment = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  
    const payload = req.body as Buffer;
    const signature = req.headers["stripe-signature"];

   await paymentService.confirmPayment(payload  , signature as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment confirmed successfully",
    data: {

    }
  });
});

const getPaymentHistory = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const customerId = req.user?.id;

  const result = await paymentService.getPaymentHistory(
    customerId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history retrieved successfully",
    data: result,
  });
});


const getPaymentDetails = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const customerId = req.user?.id;
    const paymentId =  req.params.id
  const result = await paymentService.getPaymentDetails(
   paymentId as string,
    customerId as string
    
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment details retrieved successfully",
    data: result,
  });
});

export const paymentController = {
    createPayment,
    confirmPayment,
    getPaymentHistory,
  getPaymentDetails,
}