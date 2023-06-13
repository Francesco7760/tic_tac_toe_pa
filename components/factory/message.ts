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

//class checkTokenMoveErr implements msg{
//    getMessage(): { code: number; message: string; } {
//        return {
//            code: 401,
//            message: "Error Token: not enough token to move "
//        }
//    }
//} 

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

class ShowMovesGameErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 404,
            message: "Error Moves: moves not found"
        }
    }
}

class ShowMovesGameFormatErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 404,
            message: "Error Format Result: choose between csv and json"
        }
    }
}

class AddTokenErr implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 4000,
            message: "Error Add Token: token not add"
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

class AddTokenSuccess implements msg{
    getMessage(): { code: number; message: string; } {
        return {
            code: 200,
            message: "Token add"
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
    ShowMovesGameErr,
    ShowMovesGameFormatErr,
    AddTokenErr,
    genericSuccess,
    gameCreateSuccess,
    abbandonedGameSuccess,
    CreateMoveSuccess,
    winGameSuccess,
    AddTokenSuccess
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
        case MessagesEnum.AddTokenErr:
            val = new AddTokenErr();
            break;
        case MessagesEnum.genericSuccess:
            val = new genericSuccess();
            break;
        case MessagesEnum.ShowMovesGameErr:
            val = new ShowMovesGameErr;
            break;
        case MessagesEnum.ShowMovesGameFormatErr:
            val = new ShowMovesGameFormatErr();
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
        case MessagesEnum.AddTokenSuccess:
            val = new AddTokenSuccess();
            break;
    }
    return val;
}