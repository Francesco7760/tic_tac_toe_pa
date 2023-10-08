const { StatusCode } = require('status-code-enum')
import { msgInterface } from "../factory/message_interface";

/**
 * status code http method
 * ClientErrorBadRequest = 400
 * ClientErrorUnauthorized = 401
 * ClientErrorForbidden = 403
 * ClientErrorNotFound = 404
 */

class genericError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request"
        }
    }
}

class checkAdminError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - not admin"
        }
    }
}

class checkEmailPlayerError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - email not exists"
        }
    }
}

class checkEmailOpponentError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - email opponent not exists"
        }
    }
}

class checkOpenGameError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - player without open game"
        }
    }
}

class checkOpenGameOpponentError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - oppponent without open game"
        }
    }
}

class checkWithOpenGameError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - no open game"
        }
    }
}

class checkTokenPlayerError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - not enough player token"
        }
    }
}

class checkTokenOpponentError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - not enough opponent token game"
        }
    }
}

class checkTokenMoveError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - not enough opponent token player"
        }
    }
}

class checkYourTurnError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - not your turn"
        }
    }
}

class checkGameExistsError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - game not exists"
        }
    }
}

class createNewGameError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - game not create"
        }
    }
}
class abbandonedGameError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - game not abbandoned"
        }
    }
}
class showInfoGameError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - not show info"
        }
    }
}
class createMoveError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - move not create"
        }
    }
}
class showMovesGameError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - not show moves"
        }
    }
}
class showUserRankingError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - not show ranking"
        }
    }
}
class addTokenError implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.ClientErrorBadRequest,
            message: "Bad Request - token not add"
        }
    }
}

export enum MessagesEnumError {
    genericError,
    checkAdminError,
    checkEmailPlayerError,
    checkEmailOpponentError,
    checkOpenGameError,
    checkOpenGameOpponentError,
    checkWithOpenGameError,
    checkTokenPlayerError,
    checkTokenOpponentError,
    checkTokenMoveError,
    checkYourTurnError,
    checkGameExistsError,
    createNewGameError,
    abbandonedGameError,
    showInfoGameError,
    createMoveError,
    showMovesGameError,
    showUserRankingError,
    addTokenError
}

export function getErrorMessage (type: MessagesEnumError):msgInterface {
    let msg: msgInterface;
    switch (type){
        case MessagesEnumError.genericError:
            msg = new genericError();
            break;
        case MessagesEnumError.checkAdminError:
            msg = new checkAdminError();
            break;
        case MessagesEnumError.checkEmailPlayerError:
            msg = new checkEmailPlayerError();
            break;
        case MessagesEnumError.checkEmailOpponentError:
            msg = new checkEmailOpponentError();
            break;
        case MessagesEnumError.checkOpenGameError:
            msg = new checkOpenGameError();
            break;
        case MessagesEnumError.checkOpenGameOpponentError:
            msg = new checkOpenGameOpponentError();
            break;
        case MessagesEnumError.checkWithOpenGameError:
            msg = new checkWithOpenGameError();
            break;
        case MessagesEnumError.checkTokenPlayerError:
            msg = new checkTokenPlayerError();
            break;
        case MessagesEnumError.checkTokenOpponentError:
            msg = new checkTokenOpponentError();
            break;
        case MessagesEnumError.checkTokenMoveError:
            msg = new checkTokenMoveError();
            break;
        case MessagesEnumError.checkYourTurnError:
            msg = new checkYourTurnError();
            break;
        case MessagesEnumError.checkGameExistsError:
            msg = new checkGameExistsError();
            break;
        case MessagesEnumError.createNewGameError:
            msg = new createNewGameError();
            break;
        case MessagesEnumError.abbandonedGameError:
            msg = new abbandonedGameError();
            break;
        case MessagesEnumError.showInfoGameError:
            msg = new showInfoGameError();
            break;
        case MessagesEnumError.createMoveError:
            msg = new createMoveError();
            break;
        case MessagesEnumError.showMovesGameError:
            msg = new showMovesGameError();
            break;
        case MessagesEnumError.showUserRankingError:
            msg = new showUserRankingError();
            break;
        case MessagesEnumError.addTokenError:
            msg = new addTokenError();
            break;
    }
    return msg;
}
