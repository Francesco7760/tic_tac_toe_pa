require('dotenv').config();
import * as Connection from '../singleton/db_connection';
import * as Game from '../model/game';
import * as User from '../model/user';
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

        // verifica se partita contro IA o utente
        if(req.opponent.email === "IA"){
            if(req.player.token >= 0.75){
                // sottrai token
                decreaseToken(req.body.player, 0.50);
                // crea partita
                Game.newGame(req.body.player, "IA", req.body.player);
            }
            else{
                showMessage(MessagesEnum.checkTokenPlayerErr,res);
            }
        }else{
            if(req.player.token >= 0.75){
                // sottrai token ad entrambi
                decreaseToken(req.body.player, 0.75);
                decreaseToken(req.body.opponent, 0.75);
                // crea nuova partita
                Game.newGame(req.body.player, req.body.opponent, req.body.player);
                }
                else{
                    showMessage(MessagesEnum.checkTokenPlayerErr, res);
                }
            }
            showMessage(MessagesEnum.gameCreateSuccess, res);
}
    

// controlla se un giocatore ha partite aperte
function checkOpenGameByPLayer(Player:any):any{
    let open_game_player:any;
    try{
        open_game_player = Game.Games.findAll({
            where: {
                [Op.and]: [
                    { game_open: 0 }, {
                        [Op.or]:[
                            {player_1: Player},
                            {player_2: Player}
                        ]}],
                    }
        });
    }catch(error){
        return 
    }
    return open_game_player;
}

// abbandona partita
export function AbbandonedGame(req:any, res:any):void{
    
   /**
    * verifica se la partita è aperta per entrami i giocatori
    */
if((checkOpenGameByPLayer(req.body.player).game_id == req.body.game) && 
(checkOpenGameByPLayer(req.body.opponent).game_id == req.body.game)) 
{
    // imposta come abbandonata 
    Game.setAbbandonedGame(req.body.game);
    // imposta come vincitore l'avversario
    Game.getWinner(req.body.opponent);
}
  
}

// mostra informazioni sulla partita 
export function ShowInfoGame(req:any, res:any){}

// decurta token 
function decreaseToken(email_user:string, token:number):void {
    let player:any;
        player = User.Users.findByPk(email_user);
        player.decrement('token', {by: token})

}