const jwt = require('jsonwebtoken');
import { Users } from '../model/user';
import { Games } from '../model/game';
import { MessagesEnum, getErrorMessage} from '../factory/message';
import { Op } from "sequelize";


// [] verifica se utente che fa richiesta è admin
export async function checkAdmin(req:any,res:any,next:any){

    const decoded:any = <string>jwt.decode(req.token)
    await Users.findByPk(decoded.email).then((user:any) => {
        if(user.role === decoded.role){
            console.log("utente admin");
            next();
        }else{
            const msg = getErrorMessage(MessagesEnum.checkAdminUser).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
    }
// [] verifica se player esiste
export async function checkEmailPlayer(req:any,res:any,next:any){

    await Users.findOne({
        attributes : ['email'],
        where:{email:req.user}
    }).then((user:any) => {
        if(user == null){
            
            // messaggio di eerore
            const msg = getErrorMessage(MessagesEnum.checkEmailPlayerError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }else{

            next();
            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
            
        }
    })
}

// [] verifica se avversario esite
export async function checkEmailOpponent(req:any,res:any,next:any){

        await Users.findOne({
            attributes : ['email'],
            where:{email:req.body.opponent}
        }).then((user:any) => {
            if(user == null){
                
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnum.checkEmailOpponentError).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }else{
            
            next();
            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
            }
        })
    }


// [] verifica se giocatore ha partite aperte
export async function checkOpenGame(req:any,res:any,next:any){
    
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((item:any) => {
        if(item == null){
    
            next();
            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);

        }else{

            // messaggio di errore
            const msg = getErrorMessage(MessagesEnum.checkOpenGameError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
}

// [] verifica se avversario ha partite aperte
export async function checkOpenGameOpponent(req:any,res:any,next:any){
    
    if(req.body.opponent === "IA"){
        next();
    }else{    
        
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.body.opponent},{player_2:req.body.opponent}]
                }]
        }
    }).then((item:any) => {
        if(item == null){

            next();
            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }else{
            const msg = getErrorMessage(MessagesEnum.checkOpenGameOpponentError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })}


}

// [] verifica se giocatore ha partite aperte (uso in /abbandonapartita) 
export async function checkWithOpenGame(req:any,res:any,next:any){
    
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((item:any) => {
        if(item == null){

            const msg = getErrorMessage(MessagesEnum.checkWithOpenGameErr).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }else{

            next();
            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
}

// [] verifica se giocatore ha token necessari per iniziare partita
export async function checkTokenPlayer(req:any,res:any,next:any) {
    
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.user}
    }).then((user:any) => {
        // se partita contro IA
        if(req.body.opponent === "IA"){
            // constrolla se token sono necessari
            if(user.token >= 0.75){

                next();
                // messaggio di successo
                const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);

            }else{
                const msg = getErrorMessage(MessagesEnum.checkTokenPlayerErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            
        }else{
            // se partita non è contro IA 
            if(user.token >= 0.50){
         
                next();
                // messaggio di successo
                const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);

            }else{

                const msg = getErrorMessage(MessagesEnum.checkTokenPlayerErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
        }
    })
}

// [] verifica se avversario ha token necessari per iniziare partita
export async function checkTokenOpponent(req:any,res:any,next:any) {
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.body.opponent}
    }).then((user:any) => {
        // se avversario è un utent 
        if(req.body.opponent !== "IA"){
            // constrolla se token avversario sono necessari
            if(user.token >= 0.75){

                next();
                // messaggio di successo
                const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            
        }else{
                const msg = getErrorMessage(MessagesEnum.checkTokenOpponentErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            
        }else{
            // non ci sono problemi su token IA
            next();
            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
}

// [] verifica se ci sono token necessari per fare una mossa
export async function checkTokenMove(req: any, res: any, next: any){
    
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.user}
    }).then((user:any) => {
       
            if(user.token >= 0.015){

                next();
                // messaggio di successo
                const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);

            }else{
                const msg = getErrorMessage(MessagesEnum.checkTokenPlayerErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
        }
    )
}

// [] verifica se è il turno del player
export async function checkYourTurn(req: any, res: any, next: any){
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((game:any) => {
        if(game.turn_player === req.user){

            next();
            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
            
        }else{
            const msg = getErrorMessage(MessagesEnum.checkYourTurnErr).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })

}