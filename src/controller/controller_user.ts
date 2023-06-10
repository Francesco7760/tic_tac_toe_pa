const db_connection = require('src/singleton/db_connection');
const userModel = require('src/model/user');
import { Sequelize } from "sequelize";
import { Users } from "src/model/user";

const sequelize: Sequelize = db_connection.getConnection();

// classifica giocatori
export async function ShowUserRanking(req:any, res:any){}

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