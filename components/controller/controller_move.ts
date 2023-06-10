import * as Connection from '../singleton/db_connection';
import { Games } from '../model/game';
import { Users } from '../model/user';
import { Moves } from '../model/move';
import { Sequelize, Op } from "sequelize";

const sequelize: Sequelize = Connection.db_connection.getConnection();

// crea una nuova mossa
export async function CreateMove(req:any, res:any):Promise<void>{
    // verifica se player ha game come partita aperta
    const game = await Games.findOne({
        where: {
            [Op.and]: [
                {game: 0},{
                    [Op.or]: [
                        {player_1: req.body.player},
                        {player_2: req.body.player}
                    ]}]
                }}
    );  
    // nel caso crea nuova mossa
     if(game !== null){
        Moves.create({
            player: req.body.player,
            game: req.body.game,
            game_state: req.body.game_state
        });
     }else{
        console.log("erore");
     }
}

// mostra storico mosse
export async function ShowMoves(req:any, res:any){}
