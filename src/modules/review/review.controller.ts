import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";

const reViewsCreate = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const customerId = req.user?.id as string
    const payload = req.body 

    const result = await reviewService.reViewsCreate(customerId , payload)

    sendResponse(res,{
      success: true,
      statusCode:httpStatus.CREATED,
      message: "Review created successfully",
      data: result
    });
})


const getReview = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
      const result = await reviewService.getReview();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Reviews retrieved successfully",
      data: result,
    });
  
})

export const reviweController = {
    reViewsCreate,
    getReview
}