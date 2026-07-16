import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllUsers = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
      const result = await adminService.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
})



const updateUserStatus = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await adminService.updateUserStatus(id as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User status updated successfully",
    data: result,
  });
});

const getAllGear = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const result = await adminService.getAllGear();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Gear retrieved successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const result = await adminService.getAllRentals();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};