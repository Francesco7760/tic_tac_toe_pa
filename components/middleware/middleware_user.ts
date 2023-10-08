const jwt = require('jsonwebtoken');
import { Users } from '../model/user';
import { Games } from '../model/game';
import { MessagesEnumSuccess, getSuccessMessage, messagePrint} from '../factory/message_succes';
import { MessagesEnumError, getErrorMessage } from '../factory/message_errors';

import { Op } from "sequelize";



// verifica admin
export async function checkAdmin(req:any,res:any,next:any){

    // estrapola il ruolo del giocatore dal token e lo confronta con
    // con il ruolo registrato in db
    const decoded:any = <string>jwt.decode(req.token)
    await Users.findByPk(decoded.email).then((user:any) => {
        if(user.role === decoded.role){
            
            // se i due ruoli coincidono
            // successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkAdminSuccess).getMessage();
            messagePrint(msg, res)
            next();
        }else{

            // se non coincidono
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnumError.checkAdminError).getMessage();
            messagePrint(msg, res)
        }
          
    })
    }
// verifica se player esiste
export async function checkEmailPlayer(req:any,res:any,next:any){

    // cerca utente associato a quel email
    await Users.findOne({
        attributes : ['email'],
        where:{email:req.user}
    }).then((user:any) => {
        if(user == null){
            
            // se utente non trovato
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnumError.checkEmailPlayerError).getMessage();
            messagePrint(msg, res);
        }else{

            // se utente trovato
            // successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkEmailPlayerSuccess).getMessage();
            messagePrint(msg, res);            
            next();
        }
    })
}

// verifica se avversario esite
export async function checkEmailOpponent(req:any,res:any,next:any){

        // cerca avversario associato a quel email
        await Users.findOne({
            attributes : ['email'],
            where:{email:req.body.opponent}
        }).then((user:any) => {
            if(user == null){
                
                // se avversario non trovato
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnumError.checkEmailOpponentError).getMessage();
                messagePrint(msg, res);
            }else{
            
            // se avversario trvato
            // successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkEmailOpponentSuccess).getMessage();
            messagePrint(msg, res);
            next();
            }
        })
    }


// verifica se giocatore ha partite aperte
export async function checkOpenGame(req:any,res:any,next:any){
    
    // cerca partita aperta del giocaore
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((item:any) => {
        if(item == null){
            
            // se giocatore non ha partite aperte
            // successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkOpenGameSuccess).getMessage();
            messagePrint(msg, res);
            next();
        }else{

            // se giocatore ha partite aperte
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnumError.checkOpenGameError).getMessage();
            messagePrint(msg, res);
        }
    })
}

// verifica se avversario ha partite aperte
export async function checkOpenGameOpponent(req:any,res:any,next:any){
    
    // se gioco contro IA 
    if(req.body.opponent === "IA"){
        next();
    }else{    
        
    // cerca partita aperta del avversario
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.body.opponent},{player_2:req.body.opponent}]
                }]
        }
    }).then((item:any) => {
        if(item == null){

            // se non ha partite aperte
            // successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkEmailOpponentSuccess).getMessage();
            messagePrint(msg, res);
            next();   
        }else{

            // se ha partite aperte
            // messaggiodi errore
            const msg = getErrorMessage(MessagesEnumError.checkOpenGameOpponentError).getMessage();
            messagePrint(msg, res);
        }
    })}


}

// verifica se giocatore ha partite aperte (uso in /abbandonapartita) 
export async function checkWithOpenGame(req:any,res:any,next:any){
    
    // cerca partita aperta del giocatore
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((item:any) => {
        if(item == null){

            // se non esistono partite aperte
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnumError.checkWithOpenGameError).getMessage();
            messagePrint(msg, res);
        }else{

            // se esiste una partita aperta
            // messaggio di successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkWithOpenGameSuccess).getMessage();
            messagePrint(msg, res);
            next();
        }
    })
}

// verifica se giocatore ha token necessari per iniziare partita
export async function checkTokenPlayer(req:any,res:any,next:any) {
    
    // cerca i token del giocatore
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.user}
    }).then((user:any) => {

        // se partita contro IA o contro utente
        if(req.body.opponent === "IA"){
            // constrolla se token sono necessari
            if(user.token >= 0.75){
                
                // crediti maggiori di 0.75
                // successo
                const msg = getSuccessMessage(MessagesEnumSuccess.checkTokenPlayerSuccess).getMessage();
                messagePrint(msg, res);
                next();

            }else{

                // crediti inferiori di 0.75
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnumError.checkTokenPlayerError).getMessage();
                messagePrint(msg, res);
            }
            
        }else{
            // se partita non è contro IA 
            if(user.token >= 0.50){

                // crediti superiori di 0.5
                // successo
                const msg = getSuccessMessage(MessagesEnumSuccess.checkTokenPlayerSuccess).getMessage();
                messagePrint(msg, res);
                next();
            }else{

                // crediti inferiori a 0.50
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnumError.checkTokenPlayerError).getMessage();
                messagePrint(msg, res);
            }
        }
    })
}

// verifica se avversario ha token necessari per iniziare partita
export async function checkTokenOpponent(req:any,res:any,next:any) {

    // cerca i crediti del avversario
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.body.opponent}
    }).then((user:any) => {

        // se avversario è un utente
        if(req.body.opponent !== "IA"){

            if(user.token >= 0.75){

                // crediti superiori a 0.75
                // successo
                const msg = getSuccessMessage(MessagesEnumSuccess.checkTokenOpponentSuccess).getMessage();
                messagePrint(msg, res);
                next();
            
        }else{
                // crediti inferiori a 0.75
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnumError.checkTokenOpponentError).getMessage();
                messagePrint(msg, res);
            }
            
        }else{

            // non ci sono problemi su token per IA
            // successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkTokenOpponentSuccess).getMessage();
            messagePrint(msg, res);
            next();
        }
    })
}

// verifica se ci sono token necessari per fare una mossa
export async function checkTokenMove(req: any, res: any, next: any){
    
    // cerca crediti del giocatore
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.user}
    }).then((user:any) => {
       
            if(user.token >= 0.015){

                // crediti superiori a 0.015
                // successo
                const msg = getSuccessMessage(MessagesEnumSuccess.checkTokenMoveSuccess).getMessage();
                messagePrint(msg, res);
                next();

            }else{

                // crediti inferiori a 0.015
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnumError.checkTokenMoveError).getMessage();
                messagePrint(msg, res);
            }
        }
    )
}

// verifica se è il turno del player
export async function checkYourTurn(req: any, res: any, next: any){

    // cerca la partita aperta del giocatore
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((game:any) => {
        
        //controlla chi è il prossimo a poter fare una mossa
        if(game.turn_player === req.user){

            // se è il turno dal giocatore
            // successo
            const msg = getSuccessMessage(MessagesEnumSuccess.checkYourTurnSuccess).getMessage();
            messagePrint(msg, res);
            next();
            
        }else{

            // se non è il turno del giocatore
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnumError.checkYourTurnError).getMessage();
            messagePrint(msg, res);
        }
    })

}