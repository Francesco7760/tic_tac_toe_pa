/**interfaccia per la creazione 
 * di messaggi di errore e successo
 */

export interface msg {
    getMessage(data?: any):{code: number, message: string};
}

// errori
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

class checkAdminUser implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code:401,
            message:"Error Admin: user not admin"
        }
    }
}
class checkEmailPlayer1Error implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code:400,
            message:"Error Email Player: insert email"
        }
    }
}

class checkEmailPlayer2Error implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code:400,
            message:"Error Email Opponent: insert email"
        }
    }
}

class newGameCreate implements msg{
    getMessage(data?: any): { code: number; message: string; } {
        return{
            code: 200,
            message:"Success: Game Create" 
        }
    }
}
class checkOpenGameError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 400,
            message: "Error User: user have open game"
        }
    }
}
class checkOpenGameOpponentError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 400,
            message: "Error Opponent: opponent have open game"
        }
    }
}

class checkEmailPlayerError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 400,
            message: "Error User: invalid email"
        }
    }
}
class checkEmailOpponentError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 400,
            message: "Error Opponent: invalid email"
        }
    }
} 

class checkTokenPlayerErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 401,
            message: "Error Token: player have not enough token "
        }
    }
} 

class checkTokenOpponentErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 401,
            message: "Error Token: opponent have not enough token "
        }
    }
} 

// successi
class gameCreateSuccess implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 200,
            message: "Game create"
        }
    }
}

export enum MessagesEnum {
    checkHeaderError,
    checkTokenError,
    verifyAndAuthenticateError,
    checkJwtPayloadError,
    checkAdminUser,
    checkEmailPlayer1Error,
    checkEmailPlayer2Error,
    newGameCreate,
    checkOpenGameError,
    checkOpenGameOpponentError,
    checkEmailPlayerError,
    checkEmailOpponentError,
    checkTokenPlayerErr,
    checkTokenOpponentErr,
    gameCreateSuccess
}

export function getErrorMessage (type: MessagesEnum):msg {
    let val: msg;
    switch (type){
        case MessagesEnum.checkHeaderError:
            val = new checkHeaderError();
            break;
        case MessagesEnum.checkTokenError:
            val = new checkTokenError();
            break;
        case MessagesEnum.verifyAndAuthenticateError:
            val = new verifyAndAuthenticateError();
            break;
        case MessagesEnum.checkJwtPayloadError:
            val = new checkJwtPayloadError();
            break;
        case MessagesEnum.checkAdminUser:
            val = new checkAdminUser();
            break;
        case MessagesEnum.checkEmailPlayer1Error:
            val = new checkEmailPlayer1Error();
            break;
        case MessagesEnum.checkEmailPlayer2Error:
            val = new checkEmailPlayer2Error();
            break;
        case MessagesEnum.newGameCreate:
            val = new newGameCreate();
            break;
        case MessagesEnum.checkOpenGameError:
            val = new checkOpenGameError();
            break;
        case MessagesEnum.checkOpenGameOpponentError:
            val = new checkOpenGameOpponentError();
            break;
        case MessagesEnum.checkEmailPlayerError:
            val = new checkEmailPlayerError();
            break;
        case MessagesEnum.checkEmailOpponentError:
            val = new checkEmailOpponentError();
            break;
        case MessagesEnum.checkTokenPlayerErr:
            val = new checkTokenPlayerErr();
            break;
        case MessagesEnum.checkTokenOpponentErr:
            val = new checkTokenOpponentErr();
            break;
        case MessagesEnum.gameCreateSuccess:
            val = new gameCreateSuccess();
            break;
    }
    return val;
}