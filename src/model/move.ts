import {db_connection} from '../singleton/db_connection';
import {DataTypes, Sequelize} from "sequelize";
import {Games} from './game';

// connette al db
const sequelize: Sequelize = db_connection.getConnection();

/**
 * definizione del model 'move'
 */
export const move = sequelize.define('moves', {
    move_id:{
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement: true},
    player:{
        type: DataTypes.STRING, 
        allowNull:false
    },
    game:{
        type: DataTypes.NUMBER, 
        allowNull:false
    },
    game_state:{
        type: DataTypes.JSON,
        defaultValue: {}} 
},{
    modelName:'move'
});

// set new move
export async function newGame(Player:string,Game:number, Game_state:any):Promise<void>{
    await Games.create({
        palyer:Player,
        game:Game,
        game_state:Game_state
    }); 
}

// get move by player
export async function getMoveByPlayer(Player:string):Promise<any>{
    let moves:any
    try{
        moves == await Games.findAll({
            raw:true,
            where: {
                player:Player
            }
        })
    }catch(err){
        console.log(err);
    }
    if(!moves) return null;
    if(moves !==  null) return moves;
}
// get move by game
export async function getMoveByGame(Game:number):Promise<any>{
    let moves:any
    try{
        moves == await Games.findAll({
            raw:true,
            where: {
                game:Game
            }
        })
    }catch(err){
        console.log(err);
    }
    if(!Game) return null;
    if(moves !==  null) return moves;
}

// get game_state by move_id
export async function getGameStateByMove(Move:number):Promise<any>{
    let gamestate:any
    try{
        gamestate == await Games.findAll({
            raw:true,
            attributes: ['game_state'],
            where: {
                move_id:Move
            }
        })
    }catch(err){
        console.log(err);
    }
    if(!Move) return null;
    if(gamestate !==  null) return gamestate;
}

// get game_state 
export async function getGameState(Player:string, Game:number):Promise<any>{
    let gamestate:any
    try{
        gamestate == await Games.findAll({
            raw:true,
            attributes: ['game_state'],
            where: {    
                player:Player,
                game:Game
            }
        })
    }catch(err){
        console.log(err);
    }
    if(!Player || !Game) return null;
    if(gamestate !==  null) return gamestate;
}