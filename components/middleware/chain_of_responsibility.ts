import * as MiddlewareGame from "../middleware/middleware_game";
import * as MiddlewareJwt from "../middleware/middleware_jwt";
import * as MiddlewareUser from "../middleware/middleware_user";
import * as MiddlewareBody from "../middleware/middleware_body_request"

export const check_jwt = [
    MiddlewareJwt.checkHeader,
    MiddlewareJwt.checkToken,
    MiddlewareJwt.verifyAndAuthenticate
]

export const check_creapartita = [
    MiddlewareBody.checkBodyCreapartita,
    MiddlewareUser.checkEmailPlayer,
    MiddlewareUser.checkEmailOpponent,
    MiddlewareUser.checkOpenGame,
    MiddlewareUser.checkOpenGameOpponent,
    MiddlewareUser.checkTokenPlayer,
    MiddlewareUser.checkTokenOpponent
]

export const check_creanuovamossa = [
    MiddlewareBody.checkBodyCreanuovamossa,
    MiddlewareUser.checkWithOpenGame,
    MiddlewareUser.checkTokenMove,
    MiddlewareUser.checkYourTurn
]

export const check_abbandonapartita = [
    MiddlewareUser.checkEmailPlayer,
    MiddlewareUser.checkWithOpenGame
]

export const check_statopartita = [
    MiddlewareBody.checkBodyStatopartita,
    MiddlewareGame.checkGameExists
]

export const check_storicomosse = [
    MiddlewareBody.checkBodyStoricomosse, 
    MiddlewareGame.checkGameExists
]

export const check_classifica = [
    MiddlewareBody.checkBodyClassifica
]

export const check_aggiungitoken = [
    MiddlewareBody.checkBodyAggiungitoken,
    MiddlewareUser.checkAdmin,
    MiddlewareUser.checkEmailOpponent
]
