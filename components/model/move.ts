import {db_connection} from '../singleton/db_connection';
import {DataTypes, Sequelize} from "sequelize";
//import {Games} from './game';

// connette al db
const sequelize: Sequelize = db_connection.getConnection();

/**
 * definizione del model 'move'
 */
export const Moves = sequelize.define('moves', {
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
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue:['', '', '', '', '', '', '', '', '']}
        ,
    start:{
        type: DataTypes.DATEONLY,
        allowNull:false
    }
},{
    modelName:'move',
    timestamps: false
});

// set new move
export async function newMove(Player:string,Game:number, Game_state:any){
    await Moves.create({
        player:Player,
        game:Game,
        game_state:Game_state,
        start:sequelize.fn('NOW'),
    }); 
}
