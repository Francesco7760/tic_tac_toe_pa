require('dotenv').config();
const jwt = require('jsonwebtoken');
import { MessagesEnum} from "../factory/message";

/**
 * [] checkHeader -> verifica la presenza della voce authorization nel headers della richiesta
 * 
 * [] checkToken -> verifica se nella richesta sia presente un token jwt
 * 
 * [] verifyAndAuthenticate -> verifica se l'autenticita del token confrontando una chiave segreta
 * 
 *  i tre middleware sono stati raccolti, per poter essere usti in futuro su richieste 
 *  che necessitano di autentificazione tramite token jwt
 */

// check headers
export const checkHeader = (req: any, res: any, next: any) => {
    try{
        const authHeader = req.headers.authorization;
        if(authHeader){

            // se headers authorization presente
            // messaggio di successo
            console.log("success headers");
            next();
        }
    }catch(error){

        // se headers authorization non è presente
        // messaggio di successo
        console.log("error headers");
        next(MessagesEnum.checkHeaderError);
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
            console.log("success token");
            next();
        }
        }catch(error){

        // se token jwt non presente 
        // messaggio di errore
        console.log("errore token");
        next(MessagesEnum.checkTokenError);
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
            console.log("success auth");
            next();
        }
    }catch(error){

        //messaggio di errroe
        console.log("error auth");
        next(MessagesEnum.verifyAndAuthenticateError);
    }
}

export const check_jwt = [
    checkHeader,
    checkToken,
    verifyAndAuthenticate
]
