const { StatusCode } = require('status-code-enum')
import { msgInterface } from "../factory/message_interface";

/**
 * status code http method
 * SuccessOK = 200
 * SuccessAccepted = 202
 * SuccessCreated = 201
 */

class genericSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - genric success"
        }
    }
}

class checkAdminSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - admin"
        }
    }
}

class checkEmailPlayerSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - email exists"
        }
    }
}

class checkEmailOpponentSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - email opponent exists"
        }
    }
}

class checkOpenGameSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - player with open game"
        }
    }
}

class checkOpenGameOpponentSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - opponent with open game"
        }
    }
}

class checkWithOpenGameSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - open game"
        }
    }
}

class checkTokenPlayerSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - player token right"
        }
    }
}

class checkTokenOpponentSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - opponent token game right"
        }
    }
}

class checkTokenMoveSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - opponent token move right"
        }
    }
}

class checkYourTurnSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - your turn"
        }
    }
}

class checkGameExistsSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - game exists"
        }
    }
}

class checkHeaderSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - header token success"
        }
    }
}
class checkTokenSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - token success"
        }
    }
}
class verifyAndAuthenticateSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - authinticate success"
        }
    }
}

class checkBodyCreapartitaSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - body creapartita corrent"
        }
    }
}

class checkBodyAggiungitokenSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - body aggiungitoken corrent"
        }
    }
}

class checkBodyCreanuovamossaSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - body creanuovamossa corrent"
        }
    }
}

class checkBodyStatopartitaSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - body statopartita corrent"
        }
    }

}

class checkBodyStoricomosseSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - body storicomosse corrent"
        }
    }
}

class checkBodyClassificaSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - body classifica corrent"
        }
    }
}

class createNewGameSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - game create"
        }
    }
}

class abbandonedGameSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - game abbandoned"
        }
    }
}

class showInfoGameSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - show info"
        }
    }
}

class createMoveSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - create move"
        }
    }
}

class showMovesGameSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - show moves"
        }
    }
}

class showUserRankingSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - show ranking"
        }
    }
}

class addTokenSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - add token"
        }
    }
}

class winSuccess implements msgInterface{
    getMessage(): { code: number; message: string; } {
        return {
            code: StatusCode.SuccessOK,
            message: "Success OK - you win"
        }
    }
}

export enum MessagesEnumSuccess {
    genericSuccess,
    checkAdminSuccess,
    checkEmailPlayerSuccess,
    checkEmailOpponentSuccess,
    checkOpenGameSuccess,
    checkOpenGameOpponentSuccess,
    checkWithOpenGameSuccess,
    checkTokenPlayerSuccess,
    checkTokenOpponentSuccess,
    checkTokenMoveSuccess,
    checkYourTurnSuccess,
    checkGameExistsSuccess,
    checkHeaderSuccess,
    checkTokenSuccess,
    verifyAndAuthenticateSuccess,
    checkBodyCreapartitaSuccess,
    checkBodyAggiungitokenSuccess,
    checkBodyCreanuovamossaSuccess,
    checkBodyStatopartitaSuccess,
    checkBodyStoricomosseSuccess,
    checkBodyClassificaSuccess,
    createNewGameSuccess,
    abbandonedGameSuccess,
    showInfoGameSuccess,
    createMoveSuccess,
    showMovesGameSuccess,
    showUserRankingSuccess,
    addTokenSuccess,
    winSuccess
}

export function getSuccessMessage(type: MessagesEnumSuccess){
    let msg: msgInterface;
    switch(type){
        case MessagesEnumSuccess.genericSuccess:
            msg = new genericSuccess();
            break;
        case MessagesEnumSuccess.checkAdminSuccess:
            msg = new checkAdminSuccess();
            break;
        case MessagesEnumSuccess.checkEmailPlayerSuccess:
            msg = new checkEmailPlayerSuccess();
            break;
        case MessagesEnumSuccess.checkEmailOpponentSuccess:
            msg = new checkEmailOpponentSuccess();
            break;
        case MessagesEnumSuccess.checkOpenGameSuccess:
            msg = new checkOpenGameSuccess();
            break;
        case MessagesEnumSuccess.checkOpenGameOpponentSuccess:
            msg = new checkOpenGameOpponentSuccess();
            break;
        case MessagesEnumSuccess.checkWithOpenGameSuccess:
            msg = new checkWithOpenGameSuccess();
            break;
        case MessagesEnumSuccess.checkTokenPlayerSuccess:
            msg = new checkTokenPlayerSuccess();
            break;
        case MessagesEnumSuccess.checkTokenOpponentSuccess:
            msg = new checkTokenOpponentSuccess();
            break;
        case MessagesEnumSuccess.checkTokenMoveSuccess:
            msg = new checkTokenMoveSuccess();
            break;
        case MessagesEnumSuccess.checkYourTurnSuccess:
            msg = new checkYourTurnSuccess();
            break;
        case MessagesEnumSuccess.checkGameExistsSuccess:
            msg = new checkGameExistsSuccess();
            break;
        case MessagesEnumSuccess.checkBodyCreapartitaSuccess:
            msg = new checkBodyCreapartitaSuccess();
            break;
        case MessagesEnumSuccess.checkBodyAggiungitokenSuccess:
            msg = new checkBodyAggiungitokenSuccess();
            break;
        case MessagesEnumSuccess.checkBodyCreanuovamossaSuccess:
            msg = new checkBodyCreanuovamossaSuccess();
            break;
        case MessagesEnumSuccess.checkBodyStatopartitaSuccess:
            msg = new checkBodyStatopartitaSuccess();
            break;
        case MessagesEnumSuccess.checkBodyStoricomosseSuccess:
            msg = new checkBodyStoricomosseSuccess();
            break;
        case MessagesEnumSuccess.checkBodyClassificaSuccess:
            msg = new checkBodyClassificaSuccess();
            break;
        case MessagesEnumSuccess.checkHeaderSuccess:
            msg = new checkHeaderSuccess();
            break;
        case MessagesEnumSuccess.checkTokenSuccess:
            msg = new checkTokenSuccess();
            break;
        case MessagesEnumSuccess.verifyAndAuthenticateSuccess:
            msg = new verifyAndAuthenticateSuccess();
            break;
        case MessagesEnumSuccess.createNewGameSuccess:
            msg = new createNewGameSuccess();
            break;
        case MessagesEnumSuccess.abbandonedGameSuccess:
            msg = new abbandonedGameSuccess();
            break;
        case MessagesEnumSuccess.showInfoGameSuccess:
            msg = new showInfoGameSuccess();
            break;
        case MessagesEnumSuccess.createMoveSuccess:
            msg = new createMoveSuccess();
            break;
        case MessagesEnumSuccess.showMovesGameSuccess:
            msg = new showMovesGameSuccess();
            break;
        case MessagesEnumSuccess.showUserRankingSuccess:
            msg = new showUserRankingSuccess();
            break;
        case MessagesEnumSuccess.addTokenSuccess:
            msg = new addTokenSuccess();
            break;
        case MessagesEnumSuccess.winSuccess:
            msg = new winSuccess();
            break;

    } return msg;
}

export function messagePrint(msg: any, res:any){
    console.log(msg.code + ' : ' + msg.message);
    res.status(msg.code).json(msg.message);
}