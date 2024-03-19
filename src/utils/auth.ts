import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import router from '../routes/user';
const secretKey="ushmita"
export const createJwtToken=(user:{
    id: number;
    firstName: string;
    lastName: string|null;
    email: string;
    password: string;
})=>{

    return jwt.sign(user,secretKey,{expiresIn:"24h"})
}
export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{                 //behave like a middleware
    let token=req.cookies.token;
    let decode=jwt.verify(token,secretKey);
    console.log(decode)
    if(decode){
        req.user=decode;
        return next();
    }
    res.send("token invalid");
}

export default router;