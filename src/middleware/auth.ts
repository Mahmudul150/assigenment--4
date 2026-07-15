import { NextFunction, Request, Response } from "express";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";

const auth = ( ...requiredRoles:Role[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.cookies.accessToken ?
        req.cookies.accessToken:
        req.headers.authorization ?.startsWith("Bearer")?
         req.headers.authorization?.split(" ")[1]
         :req.headers.authorization


         if (!token) {
            throw new Error("You are not logged in . Please log in to access this resource")
         }

         const verifiedToken = jwtUtils.verifyToken(token , config.jwt_access_secret)

         if (!verifiedToken.success) {
            throw new Error(verifiedToken.error)
         }

         const {email, name , id, role} = verifiedToken.data as JwtPayload;

         if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("FORBIDDEN . you don't have to permission to access the resource...")
         }

         const user = await prisma.user.findUnique({
            where:{
                id
            }
         })

         if (!user) {
            throw new Error("User not found. Please login again..!")
         }

         if (user.status === 'SUSPENDED') {
            throw new Error("Your account has been Blocked. Please contact support..!")
         }

         req.user = {
            id,
            name,
            email,
            role    
         }

         next()
    })
}

export default auth