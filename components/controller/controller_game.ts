require('dotenv').config();
import * as Connection from '../singleton/db_connection';
import { Users } from '../model/user';
import { Games , newGame} from '../model/game';
import * as Move from '../model/move';
import { Sequelize, Op } from "sequelize";
import { MessagesEnum, getErrorMessage} from '../factory/message';

//const jwt = require('jsonwebtoken');
const sequelize: Sequelize = Connection.db_connection.getConnection();

// mostra messagi di errore o successo
function showMessage(Msg:MessagesEnum,res:any){
    const msg = getErrorMessage(Msg).getMessage();
    console.log(msg.code + ' : ' + msg.message);
    res.status(msg.code).json(msg.message);
}

// crea una nuova partita da giocare
export async function CreateNewGame(req:any, res:any){

        if(req.body.email === "IA"){
                // sottrai token
                Users.decrement(['token'], 
                {by:0.75, where: {email:req.user}})
                // crea partita
                newGame(req.user, "IA", req.user);

                const msg = getErrorMessage(MessagesEnum.gameCreateSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            else{       
                // sottrai token ad entrambi
                Users.decrement(['token'], 
                {by:0.5, where: {email:req.user}})
                Users.decrement(['token'], 
                {by:0.5, where: {email:req.body.opponent}})
                // crea nuova partita
                newGame(req.user, req.body.opponent, req.user);

                const msg = getErrorMessage(MessagesEnum.gameCreateSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
        }                
}
// abbandona partita
export async function AbbandonedGame(req:any, res:any){

        await Games.findOne({
        where:{
            [Op.and]: [{game_open: 0},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
                }
            }).then((game:any) => {
                if(game.player_1 === req.user){
                    Games.update({
                        [Op.and]:
                        [{game_abandoned: true},{game_open:1}]}, 
                        {where: {player_1:req.user}})

                    // imposta vincitore l'avversario
                    Games.update({winner: game.player_2}, {where: {player_1:req.user}})
                    // elimina il gioco come OPEN
                    Games.update({game_open: 1}, {where: {player_1:req.user}})

                    const msg = getErrorMessage(MessagesEnum.abbandonedGameSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);

                }else 
                if(game.player_2 === req.user){
                    Games.update({
                        [Op.and]:
                        [{game_abandoned: true},{game_open:1}]},
                        {where: {player_2:req.user}})

                    // imposta vincitore l'avversario
                    Games.update({winner: game.player_1}, {where: {player_2:req.user}})
                    // elimina il gioco come OPEN
                    Games.update({game_open: 1}, {where: {player_2:req.user}})

                    const msg = getErrorMessage(MessagesEnum.abbandonedGameSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);
                }else{

                    const msg = getErrorMessage(MessagesEnum.AbbandonedGameErr).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);
                }
            })
    
}

// mostra informazioni sulla partita 
export function ShowInfoGame(req:any, res:any){}

