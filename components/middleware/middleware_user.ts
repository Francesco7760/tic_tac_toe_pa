const jwt = require('jsonwebtoken');
import { Users } from '../model/user';
import { Games } from '../model/game';
import { MessagesEnum} from '../factory/message';
import { Op } from "sequelize";


// verifica se utente che fa richiesta è admin
export function checkAdmin(req:any,res:any,next:any):void{

    if(req.headers.authorization){
        const decoded:any = <string>jwt.decode(req.headers.authorization)
        if(decoded.role === "admin"){
          next();
        }else{
          next(MessagesEnum.checkAdminUser)
        }
        
      }
}

// verifica se giocatore esiste 
export function checkEmailPlayer(req:any,res:any,next:any):void{
    Users.findByPk(req.body.email).then((item:any) => {
        if(item === undefined){
            next();
        }
        else {
            next(MessagesEnum.checkEmailPlayerError);
        }
    })
}

// verifica se avversario esite
export function checkEmailOpponent(req:any,res:any,next:any):void{
    Users.findByPk(req.body.opponent).then((item:any) => {
        if(item === undefined){
            next();
        }
        else {
            next(MessagesEnum.checkEmailOpponentError);
        }
    })
}

// verifica se giocatore ha partite aperte
export function checkOpenGame(req:any,res:any,next:any):void{
    Games.findOne({
        where:{
            [Op.and]: [
                {game_open: 0},{
                    [Op.or]:[
                        {player_1:req.body.email},
                        {player_2:req.body.email}
                    ]
                }
            ]
        }
    }).then((item:any) => {
        if(item === undefined){
            next();
        }else{
            next(MessagesEnum.checkOpenGameError);
        }
    })
}

// verifica se avversario ha partite aperte
export function checkOpenGameOpponent(req:any,res:any,next:any):void{
    Games.findOne({
        where:{
            [Op.and]: [
                {game_open: 0},{
                    [Op.or]:[
                        {player_1:req.body.opponent},
                        {player_2:req.body.opponent}
                    ]
                }
            ]
        }
    }).then((item:any) => {
        if(item === undefined){
            next();
        }else{
            next(MessagesEnum.checkOpenGameOpponentError);
        }
    })
}


