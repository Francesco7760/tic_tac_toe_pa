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
export async function AddToken(req:any, res:any){

    console.log("########" + req.body.token_add)
    console.log("########" + req.body.opponent)
    Users.increment(['token'], 
                {by: Number(req.body.token_add), 
                    where: {email:req.body.opponent}})
};