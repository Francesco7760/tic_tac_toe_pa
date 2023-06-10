import * as Connection from '../singleton/db_connection';
import { Games } from '../model/game';
import { Users } from '../model/user';
import { Moves } from '../model/move';
import { Sequelize } from "sequelize";



const sequelize: Sequelize = Connection.db_connection.getConnection();

// classifica giocatori
export async function ShowUserRanking(req:any, res:any):Promise<any>{
}

// aggiungi token
export async function AddToken(EmailPlayer:string, Token:number, Res:any):Promise<void>{
    const player = await Users.findByPk(EmailPlayer);
    if(player == null){
        if(Token < 0){
            console.log("token negativi")
        }
        console.log("giocatore non esiste")
    } else {
        player.increment('token', {by: Token});
    }
};