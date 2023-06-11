require('dotenv').config();
const jwt = require('jsonwebtoken');
import { MessagesEnum } from "../factory/message";

/**
 * [] checkHeader
 * [] checkToken
 * [] verifyAndAuthenticate
 * [] checkJwtPayload
 */

export const checkHeader = (req: any, res: any, next: any) => {
    try{
        const authHeader = req.headers.authorization;
        if(authHeader){
            next();
        }
    }catch(error){
        next(MessagesEnum.checkHeaderError);
    }
};

export const checkToken = (req: any, res: any, next: any) => {
    try{
        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader!== 'undefined'){
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            next();
        }
        }catch(error){
        next(MessagesEnum.checkTokenError);
    }
};

export const verifyAndAuthenticate = (req: any, res: any, next: any) => {
    try{
        let decoded = jwt.verify(req.token, process.env.SECRET_KEY!);
        console.log(decoded)
        if(decoded !== null){
            req.user = decoded;
            next();
        }
    }catch(error){
        next(MessagesEnum.verifyAndAuthenticateError);
    }
};

export const checkJwtPayload = (req: any, res: any, next: any) => {
    console.log(req.user);
    if(req.user.role === 'admin' || req.user.role === 'user') {
        next();
    }else{
        next(MessagesEnum.checkJwtPayloadError)
    }
};


