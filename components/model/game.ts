import { DataTypes, Sequelize, Op } from "sequelize";
import { db_connection } from '../singleton/db_connection'; 
import { Users } from "./user";

// connessione db
const sequelize: Sequelize = db_connection.getConnection();

/**
 * definizione model 'game'
 */
export const Games = sequelize.define('games',{
    game_id: {
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement: true},
    player_1:{
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
        }
    },
    player_2: {
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
        }
        },
    game_open:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    game_abandoned:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    winner:{
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
        }
     },
    turn:{
        type: DataTypes.INTEGER,
        defaultValue:0}
},{
    modelName:'games',
    timestamps: false
});

// set game
export async function newGame(Player1:string,Player2:string):Promise<void>{
        await Games.create({
            player_1: Player1,
            player_2: Player2,
            game_open: 0,
            turn: 0
        }); 
}

// get game by player
export function getGame(Player:string):any{
    let game:any
    try{
        game ==  Games.findAll({
            raw:true,
            where:{
                [Op.or]:[
                    {player_1: Player},
                    {player_2: Player}
                ]

            }
        })
    }catch(err){
        console.log(err);
    }
    if(!Player) return false;
    if(game === true) return game;
    else return false;
}

// set winner
export async function setWinner(game:number, user_email:string):Promise<void>{
    await Games.update(
        {winner: user_email},{
        where:{
            game_id: game
        }
    });
}

// get winner
export async function getWinner(game:number):Promise<any>{
    let winner_game:any
    try{
        winner_game == await Games.findOne({
            raw:true,
            attributes: ['winner'],
            where: {
                game_id:game
            }
        })
    }catch(err){
        console.log(err);
    }
    if(!game) return null;
    if(winner_game !==  null) return winner_game;
    else return null;
}

// set open_game
export async function setOpenGame(game:number):Promise<void>{
    await Games.update(
        {game_id: game},{
        where:{
            game_open: 0
        }
    });
}

// get open_game
export  function getOpenGame(email:string):any{
    let gameopen:any
    try{
        gameopen ==  Games.findAll({
            raw:true,
            attributes: ['game_open'],
            where:{
                [Op.or]:[
                    {player_1: email},
                    {player_2: email}
                ]

            }
        })
    }catch(err){
        console.log(err);
    }
    if(!email) return false;
    if(gameopen === true) return true;
    else return false;
}
// get turn
export async function getTurn(game:number):Promise<any>{
    let turn_game:any
    try{
        turn_game == await Games.findOne({
            raw:true,
            attributes: ['turn'],
            where: {
                game_id:game
            }
        })
    }catch(err){
        console.log(err);
    }
    if(!game) return null;
    if(turn_game !==  null) return turn_game;
}

// set turn
export async function setTurn(game:number, turn_game :number):Promise<void>{
    await Games.update(
        {game_id: game},{
        where:{
            turn: turn_game
        }
    });
}

// controlla se un giocatore ha partite aperte
export  function getOpenGameByPLayer(Player:any):any{
    let open_game_player:any;
    if(Player != null){
        open_game_player = Games.findAll({
            where: {
                [Op.and]: [
                    { game_open: 0 }, {
                        [Op.or]:[
                            {player_1: Player},
                            {player_2: Player}
                        ]}],
                    }
        });
    }else{
        console.log("errore");
    }
    return open_game_player;
}

// set game_abandoned game 
export function setAbandonedGame(Game:string):void{
     Games.update(
        {game_id: Game},{
        where:{
            game_abandoned: 1
        }
    });
}