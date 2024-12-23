import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const verifyAdminToken = (req: Request, res :Response, next : NextFunction):void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token ){
        res.status(401).json({ message : "Erişim izni yok, token eksik "});
        return;
    }

    try{
        const adminSecretKey = process.env.ADMIN_JWT_SECRET || "null";
        const decode = jwt.verify(token, adminSecretKey);

        (req as any).user = decode;

        next();
    }catch (error) {
        res.status(401).json({message : "Token geçersiz", error});
        return;
    }
};

export const verifyUserToken = (req: Request, res :Response, next : NextFunction) : void => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(401).json({message : "Erişim izni yok, token eksik"});
        return;
    }

    try {
        const userSecretKey = process.env.USER_JWT_SECRET || "null";
        const decode = jwt.verify(token, userSecretKey);

        (req as any).user = decode;

        next();
    } catch (error) {
        res.status(401).json({message: "Token Geçersiz", error});
        return;
    }
}