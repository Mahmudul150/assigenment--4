import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rentalService } from "./rental.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus  from "http-status";

const createRental = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const customerId = req.user?.id
    const payload = req.body 
    const result = await rentalService.createRental(payload ,customerId as string) ;

     sendResponse(res,{
      success: true,
      statusCode:httpStatus.OK,
      message: "create rental  successfully",
      data: result
    });

})
const getAllRentals = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
      const result = await rentalService.getAllRentals();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All rentals retrieved successfully",
      data: result,
    });
  
})

const getRentalById = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const rentalId = req.params.id
     const result = await rentalService.getRentalById(rentalId as string)

    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "single rentalOrder retrieved successfully",
      data: result,
    });     
})



export const rentalController = {
    createRental,
    getAllRentals,
    getRentalById
}