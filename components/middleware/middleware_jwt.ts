require('dotenv').config();
const jwt = require('jsonwebtoken');
import { MessagesEnum ,getErrorMessage} from "../factory/message";

/**
 * [] checkHeader
 * [] checkToken
 * [] verifyAndAuthenticate
 */

export const checkHeader = (req: any, res: any, next: any) => {
    try{
        const authHeader = req.headers.authorization;
        if(authHeader){

            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.checkGameExistsErr).getMessage();
            console.log(msg.code + "success headers");
            res.status(msg.code).json(msg.message);

            next();
        }
    }catch(error){
        console.log("error headers");
        next(MessagesEnum.checkHeaderError);
    }
}

export const checkToken = (req: any, res: any, next: any) => {
    try{
        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader!== 'undefined'){
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;

            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.checkGameExistsErr).getMessage();
            console.log(msg.code + "success token");
            res.status(msg.code).json(msg.message);

            next();
        }
        }catch(error){
            console.log("errore token");
        next(MessagesEnum.checkTokenError);
    }
}

export const verifyAndAuthenticate = (req: any, res: any, next: any) => {
    try{
        const decoded = <string>jwt.verify(req.token, process.env.SECRET_KEY!);
        const player:any = <string>jwt.decode(req.token)

        // messaggio di successo
        const msg = getErrorMessage(MessagesEnum.checkGameExistsErr).getMessage();
        console.log(msg.code + "success auth");
        res.status(msg.code).json(msg.message);
;
        if(decoded !== null){
            req.user = player.email;
            next();
        }
    }catch(error){
        console.log("error auth");
        next(MessagesEnum.verifyAndAuthenticateError);
    }
}

export const check_jwt = [
    checkHeader,
    checkToken,
    verifyAndAuthenticate
]
