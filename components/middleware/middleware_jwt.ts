const jwt = require('jsonwebtoken');

import { MessagesEnumSuccess, getSuccessMessage, messagePrint} from '../factory/message_succes';

// check headers
export const checkHeader = (req: any, res: any, next: any) => {
    try{
        const authHeader = req.headers.authorization;
        if(authHeader){

            // se headers authorization presente
            // messaggio di successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkHeaderSuccess).getMessage();
            messagePrint(msg, res);
            next();
        }
    }catch(error){

        // se headers authorization non è presente
        // messaggio di successo
        messagePrint(error, res);
    }
}

// check token jwt
export const checkToken = (req: any, res: any, next: any) => {
    try{
        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader!== 'undefined'){
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;

            // se token jwt presente
            // messaggio di successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkTokenSuccess).getMessage();
            messagePrint(msg, res);
            next();
        }
        }catch(error){

        // se token jwt non presente 
        // messaggio di errore
        messagePrint(error, res);
    }
}

// check chiave segreta
export const verifyAndAuthenticate = (req: any, res: any, next: any) => {
    try{

        // decodifica del token per verificare la presenza della chiave corretta
        const decoded = <string>jwt.verify(req.token, process.env.SECRET_KEY!);
        const player:any = <string>jwt.decode(req.token);

        if(decoded !== null){

            // inoltre conserva l'email presenta nel token
            req.user = player.email;

            // messaggio di successo
            const msg = getSuccessMessage(MessagesEnumSuccess.verifyAndAuthenticateSuccess).getMessage();
            messagePrint(msg, res);
            next();
        }
    }catch(error){

        //messaggio di errroe
        messagePrint(error, res);

    }
}

