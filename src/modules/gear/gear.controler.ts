import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { gearService } from "./gear.service";
import httpStatus from 'http-status';
import { sendResponse } from "../../utils/sendResponse";

const getAllGear = catchAsync(async (req:Request, res:Response,next:NextFunction) => {

    const query = req.query

    const gear = await gearService.getAllGear(query);

    sendResponse(res,{
      success: true,
      statusCode:httpStatus.OK,
      message: "get all  gear  successfully",
      data: gear
    });
})


const getSingelGear = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const gearId = req.params.id 

    const result = await gearService.getSingelGear(gearId as string)

     sendResponse(res,{
      success: true,
      statusCode:httpStatus.OK,
      message: "get singleGear  retrived  successfully",
      data: result
    });
})


const getGearWithCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const categoryId = req.params.categoryId; 

    const result = await gearService.getGearWithCategory(categoryId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category gear retrieved successfully",
        data: result
    });
});




export const gearController = {
    
    getAllGear,
    getSingelGear,
    getGearWithCategory,
   
}