/**interfaccia per la creazione 
 * di messaggi di errore e successo
 */

export interface msg {
    getMessage(data?: any):{code: number, message: string};
}

class checkHeaderError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 400,
            message: "Error Token: missing header"
        }
    }
}

class checkTokenError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 400,
            message: "Error Token: missing token"
        }
    }
}
class verifyAndAuthenticateError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code:403,
            message:"Error Token: token invalid"
        }
    }
}

class checkJwtPayloadError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code:400,
            message:"Error Token: token payload error"
        }
    }
}
export enum messages {
    checkHeaderError,
    checkTokenError,
    verifyAndAuthenticateError,
    checkJwtPayloadError
}

export function getErrorMessage (type: messages):msg {
    let val: msg;
    switch (type){
        case messages.checkHeaderError:
            val = new checkHeaderError();
            break;
        case messages.checkTokenError:
            val = new checkTokenError();
            break;
        case messages.verifyAndAuthenticateError:
            val = new verifyAndAuthenticateError();
            break;
        case messages.checkJwtPayloadError:
            val = new checkJwtPayloadError();
            break;
    }
    return val;
}