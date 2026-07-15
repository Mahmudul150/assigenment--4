import { Role, UserStatus } from "../../../generated/prisma/enums";

export interface TUser{
   name:  string;           
  email : string;           
  password :string;
    phone ? : string;      
  address?:string;      
  profileImage?:string;
  role : Role ;      
  status?  : UserStatus;    
}


export interface TULog {
  email:string,
  password:string
}
