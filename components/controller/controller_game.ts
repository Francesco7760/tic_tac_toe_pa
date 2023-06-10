require('dotenv').config();
import * as Connection from '../singleton/db_connection';
import * as Game from '../model/game';
import * as User from '../model/user';
import * as Move from '../model/move';
import { Sequelize, Op } from "sequelize";
import { Messages } from 'components/factory/message';

const jwt = require('jsonwebtoken');

const sequelize: Sequelize = Connection.db_connection.getConnection();

// crea una nuova partita da giocare
export async function CreateNewGame(req:any, res:any){

    const player = await User.Users.findByPk(req.body.player_1);
    const opponent = await User.Users.findByPk(req.body.player_2);

    // verifica se player 1 esite e non ha partite aperte
    if(player !== null && Game.getOpenGameByPLayer(req.body.player_1) === null){

        // verifica se contro player2 e se non ha partite aperte
        if(req.body.player_2 !== "IA" && opponent !== null && Game.getOpenGameByPLayer(req.body.player_2) !== null){

            //verifica se token sufficenti > 0.50
            if((User.getTokenByPlayer(req.body.player_1)) >= 0.50 && (User.getTokenByPlayer(req.body.player_2) >= 0.50)){
                // sottrai token
                decreaseToken(req.body.player_1, 0.50);
                decreaseToken(req.body.player_2, 0.50);
                // crea partita
                Game.newGame(req.body.player_1,req.body.player_2);
                return Messages.newGameCreate;
            }else{
                console.log("token non sufficenti");
            }
        }else if(req.body.player_2 === "IA"){
            if((User.getTokenByPlayer(req.body.player_1)) >= 0.75){
                // sottrai token
                decreaseToken(req.body.player_1, 0.75);
                // crea partita contro IA
                Game.newGame(req.body.player_1,req.body.player_2);
                return Messages.newGameCreate;
            }

        }else{
            // console.log("errore con avversario");
        }
    }else{
        // console.log("errore con giocatore");
    }
    
    
   
}

// abbandona partita
export function AbbandonedGame(req:any, res:any):void{
    /**
     * req.body.game
     * req.body.opponent
     */
    if(Game.getOpenGame(req.body.game)){
        if(Game.getGame(req.body.opponent)){
            Game.setAbandonedGame(req.body.game);
            Game.setWinner(req.body.game,req.body.opponent);
        }else{
            // errore avversario non associato a partita
        }
    }else{
        // errore partita non aperta 
    }
}

// mostra informazioni sulla partita 
export async function ShowInfoGame(req:any, res:any){}

// decurta token 
function decreaseToken(email_user:string, token:number):void {
    let player:any;
        player = User.Users.findByPk(email_user);
        player.decrement('token', {by: token})

}