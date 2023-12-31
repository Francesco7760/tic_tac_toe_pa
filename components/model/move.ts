import {db_connection} from '../singleton/db_connection';
import {DataTypes, Sequelize} from "sequelize";

import { Users } from "./user";
import { Games } from './game';

// connette al db
const sequelize: Sequelize = db_connection.getConnection();

/**
 * [] Moves -> model 'move'
 * 
 * [] newMove -> crea una nuova possa specificando:
 *                  - giocatore che compie la mossa
 *                  - partita dove registrare la mossa
 *                  - il vettore associato alla mossa del giocatore
 */

export const Moves = sequelize.define('moves', {
    move_id:{
        type: DataTypes.INTEGER, 
        primaryKey:true, 
        autoIncrement: true
    },

    player:{
        type: DataTypes.STRING, 
        references:{
            model:Users,
            key:'email'
                },
        allowNull:false
    },
    
    game:{
        type: DataTypes.NUMBER, 
        references:{
            model:Games,
            key:'game_id'
                },
        allowNull:false
    },
    
    game_state:{
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue:['', '', '', '', '', '', '', '', ''],
        allowNull:false
    },

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
    
    try{
        await Moves.create({
            player:Player,
            game:Game,
            game_state:Game_state,
            start:sequelize.fn('NOW'),
        })
    }catch(error){

        console.log(error);
    } 
}
