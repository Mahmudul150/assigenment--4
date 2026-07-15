import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import { TULog, TUser } from "./auth.interface"
import config from "../../config"
import Jwt, { JwtPayload, SignOptions }  from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";

const registerUser  = async(payload:TUser)=>{
    const {name,email,password,phone,address,profileImage,role,status}= payload

    const hashedPassword =await bcrypt.hash(password , Number(config.bcrypt_salt_rounds))
     const isUserExist = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if (isUserExist) {
        throw new Error("User Already exist ...!");
        
    }
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
            address,
            phone,
            profileImage,
            role,
            status
            
        },
        omit:{
            password:true
        }
        
    })

   

    return user
}

const loginUser = async(payload:TULog)=>{
    const {email, password} = payload

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email
        }
    })
    const isPasswordMatch =await bcrypt.compare(password , user.password)

    if (!isPasswordMatch) {
        throw new Error("password Is not Match");
        
    }

    const jwtPayload = {
        id:user.id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        profileImage:user.profileImage,
        role:user.role,
        
    }

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        {
        expiresIn:config.jwt_access_expires_in
        } as SignOptions
    )

const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        {
        expiresIn:config.jwt_refresh_expires_in
        } as SignOptions
    )

    return {
        accessToken,
        refreshToken
    }

}

const getMyProfile = async (userId : string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where : {id : userId},
        omit : {
            password : true
        }
    });

    return user;
}



const refreshToken = async(refreshToken:string)=>{  
    const verifyedRefreshTOken = jwtUtils.verifyToken(refreshToken , config.jwt_refresh_secret)

    if (!verifyedRefreshTOken.success) {
        throw new Error(verifyedRefreshTOken.error)
    }

    const {id} = verifyedRefreshTOken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({  
        where:{
            id
        }
    })

    if (user.status === 'SUSPENDED') {
        throw new Error("user is Blocked")
    }

    const jwtPayload = {        
        id:user.id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        profileImage:user.profileImage,
        role:user.role,
    }


    const accessToken = jwtUtils.createToken(jwtPayload , config.jwt_access_secret , {
        expiresIn:config.jwt_access_expires_in
        }as SignOptions ) 

    return {
        accessToken
    }

}

export const authService ={
    registerUser ,
    loginUser,
    getMyProfile,
    refreshToken
}