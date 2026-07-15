import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService,  } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status'

const registerUser  = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload = req.body 
    const result = await authService.registerUser (payload )

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"user register successfully",
        data:result
    })
})

const loginUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload = req.body
    const {accessToken, refreshToken} = await authService.loginUser(payload)

    res.cookie("accessToken", accessToken, {
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 // 24 hour or 1 day
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 * 7 // 7 day
    })

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"user Login successfully",
        data:{
            accessToken, refreshToken
        }
    })
})

const profileUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const userId = req.user?.id
    console.log(userId)
    const profile = await authService.getMyProfile(userId as string);
    
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"My profile get successfully",
        data:profile
    })
})


const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken; 


    const { accessToken } = await authService.refreshToken(refreshToken); 


    res.cookie("accessToken", accessToken, { 
      httpOnly: true, 
      secure: true, 
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, 
    })
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Token Refresh successFully",
      data: {
        accessToken,
      },
    });
  },
);

export const authController = {
    registerUser ,
    loginUser,
    profileUser,
    refreshToken
}