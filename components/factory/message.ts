/**interfaccia per la creazione 
 * di messaggi di errore e successo
 */

export interface msg {
    getMessage(data?: any):{code: number, message: string};
}

// errori
class genericError implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 400,
            message: "Bad Request"
        }
    }
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
            code: 400,
            message: "Error Token: token payload error"
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
    getMessage(): { code: number; message: string; } {
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
            message: "Error Token: not enough token to create game "
        }
    }
} 

class checkTokenMoveErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 401,
            message: "Error Token: not enough token to move "
        }
    }
} 

class checkTokenOpponentErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 401,
            message: "Error Token: opponent have not enough token to create game"
        }
    }
} 

class checkWithOpenGameErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 403,
            message: "Error Open Game: player not has open game, forbidden abbandoned game"
        }
    }
}

class AbbandonedGameErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 403,
            message: "Error Abbandoned: forbidden abbandoned game"
        }
    }
} 
class checkYourTurnErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 403,
            message: "Error Turn: forbidden move, not your turn"
        }
    }
}

class checkGameExistsErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 400,
            message: "Error Game: game not exits"
        }
    }
}

class CreateMoveErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 403,
            message: "Error Move: move not allowed"
        }
    }
}

// successi
class genericSuccess implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 200,
            message: "Ok"
        }
    }
}
class gameCreateSuccess implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 200,
            message: "Game create"
        }
    }
}

class CreateMoveSuccess implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 200,
            message: "Move create"
        }
    }
}
class abbandonedGameSuccess implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 200,
            message: "Game abbandoned"
        }
    }
}

class winGameSuccess implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 200,
            message: "Game win"
        }
    }
}

export enum MessagesEnum {
    genericError,
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
    checkWithOpenGameErr,
    AbbandonedGameErr,
    checkYourTurnErr,
    checkGameExistsErr,
    CreateMoveErr,
    genericSuccess,
    gameCreateSuccess,
    abbandonedGameSuccess,
    CreateMoveSuccess,
    winGameSuccess
}

export function getErrorMessage (type: MessagesEnum):msg {
    let val: msg;
    switch (type){
        case MessagesEnum.genericError:
            val = new genericError();
            break;
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
        case MessagesEnum.checkWithOpenGameErr:
            val = new checkWithOpenGameErr();
            break;
        case MessagesEnum.AbbandonedGameErr:
            val = new AbbandonedGameErr();
            break;
        case MessagesEnum.checkYourTurnErr:
            val = new checkYourTurnErr();
            break;
        case MessagesEnum.checkGameExistsErr:
            val = new checkGameExistsErr();
            break;
        case MessagesEnum.CreateMoveErr:
            val = new CreateMoveErr();
            break;
        case MessagesEnum.genericSuccess:
            val = new genericSuccess();
            break;
        case MessagesEnum.gameCreateSuccess:
            val = new gameCreateSuccess();
            break;
        case MessagesEnum.abbandonedGameSuccess:
            val = new abbandonedGameSuccess();
            break;
        case MessagesEnum.CreateMoveSuccess:
            val = new CreateMoveSuccess();
            break;
        case MessagesEnum.winGameSuccess:
            val = new winGameSuccess();
            break;
    }
    return val;
}