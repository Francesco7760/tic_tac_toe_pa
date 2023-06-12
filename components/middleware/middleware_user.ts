const jwt = require('jsonwebtoken');
import { Users } from '../model/user';
import { Games } from '../model/game';
import { MessagesEnum, getErrorMessage} from '../factory/message';
import { Op } from "sequelize";


// verifica se utente che fa richiesta è admin
export function checkAdmin(req:any,res:any,next:any):void{
    try{
        const decoded:any = <string>jwt.decode(req.token)
        next();

    }catch(error){
          next(MessagesEnum.checkAdminUser)
        }
    }

// verifica se avversario esite
export async function checkEmailOpponent(req:any,res:any,next:any){

        await Users.findOne({
            attributes : ['email'],
            where:{email:req.body.opponent}
        }).then((user:any) => {
            if(user == null){
                console.log("not valid email opponent")
                const msg = getErrorMessage(MessagesEnum.checkEmailOpponentError).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }else{
                console.log("valid email opponent")
                next();
            }
        })
    }


// verifica se giocatore ha partite aperte
export async function checkOpenGame(req:any,res:any,next:any){
    
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: 1},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((item:any) => {
        if(item == null){
    console.log("seccess player with not open game");
    next();
        }else{
            console.log("error player with open game");
            const msg = getErrorMessage(MessagesEnum.checkOpenGameError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
}

// verifica se avversario ha partite aperte
export async function checkOpenGameOpponent(req:any,res:any,next:any){
    
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: 1},
                {
            [Op.or]:[{player_1:req.body.opponent},{player_2:req.body.opponent}]
                }]
        }
    }).then((item:any) => {
        if(item == null){
            next();
        }else{
            const msg = getErrorMessage(MessagesEnum.checkOpenGameOpponentError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
}

// verifica se giocatore ha token necessari per giocare
export async function checkTokenPlayer(req:any,res:any,next:any) {
    
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.user}
    }).then((user:any) => {
        // se partita contro IA
        if(req.body.opponent === "IA"){
            // constrolla se token sono necessari
            if(user.token >= 0.75){
                console.log("token necessari per avviare partita contro IA")
                next();
            }else{
                const msg = getErrorMessage(MessagesEnum.checkTokenPlayerErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            
        }else{
            // se partita non è contro IA 
            if(user.token >= 0.50){
                console.log("token sufficenti per avviare partita contro avversario")
                next();
            }else{
                const msg = getErrorMessage(MessagesEnum.checkTokenPlayerErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
        }
    })
}

export async function checkTokenOpponent(req:any,res:any,next:any) {
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.body.opponent}
    }).then((user:any) => {
        // se avversario è un utent 
        if(req.body.opponent !== "IA"){
            // constrolla se token avversario sono necessari
            if(user.token >= 0.75){
                console.log("token avversario sufficenti per avviare partita")
                next();
            }else{
                const msg = getErrorMessage(MessagesEnum.checkTokenOpponentErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            
        }else{
            // se partita non è contro IA 
            // non ci sono problemi su token IA
            next();
        }
    })
}