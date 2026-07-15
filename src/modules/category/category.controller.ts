import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { categoryService } from "./category.service";

const createCategory = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const payload = req.body;
    const {name} = payload
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }
    const category = await categoryService.createCategory(payload);

    sendResponse(res,{
      success: true,
      statusCode:httpStatus.CREATED,
      message: "Category created successfully",
      data: category
    });
})


const getAllCategories = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const categories = await categoryService.getAllCategories();

     sendResponse(res,{
      success: true,
      statusCode:httpStatus.CREATED,
      message: "get all Category  successfully",
      data: categories
    });
})

export const categoryController={
    createCategory,
    getAllCategories
}