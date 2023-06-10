// middleware per validare jwt
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const message = require('src/factory/message');

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
        next(message.NoHeader);
    }
};

export const checkToken = (req: any, res: any, next: any) => {
    try{
        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader!=='undefined'){
            const bearerToken = bearerHeader.split(' ')[1];
            req.token=bearerToken;
            next();
        }
    }catch(error){
        next(message.checkToken);
    }
};

export const verifyAndAuthenticate = (req: any, res: any, next: any) => {
    try{
        let decode = jwt.verify(req.token, process.env.SECRET_KEY)
        if(decode !== null)
        req.user = decode;
        next();
    }catch(error){
        next(message.verifyAndAuthenticateError);
    }
};

export const checkJwtPayload = (req: any, res: any, next: any) => {
    try{
        if((req.user.role === 'admin' || req.user.role === 'admin') && req.user.email){
            next();
        }
    }catch(error){
        next(message.checkJwtPayloadError)
    }
};
