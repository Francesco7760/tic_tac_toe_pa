import { DataTypes, Sequelize } from "sequelize";
import { db_connection } from '../singleton/db_connection'; 
import { Users } from "./user";

import * as Values from "../utils/values"
// connessione db
const sequelize: Sequelize = db_connection.getConnection();

/**
 * [] Games -> model 'games'
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
                    },
        allowNull: false

            },

    player_2: {
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
                },
        allowNull: false
            },

    status:{
        type: DataTypes.ENUM({values: Values.status_game}),
        allowNull: false
    },

    winner:{
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
        }
     },

    loser:{
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
        }
     },

    turn_player:{
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
        },
        allowNull: false
    },

    x_player:{       
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
        },
        allowNull: false
    },

    game_state_last:{
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue:['', '', '', '', '', '', '', '', ''],
        allowNull: false} 
},{
    modelName:'games',
    timestamps: false
});

// set game
export async function newGame(Player_1:string, Player_2:string
    ,Turn_player:string, X_player:string){
    
    try{
        await Games.create({
            player_1:Player_1,
            player_2:Player_2,
            status:Values.status_game[0],
            turn_player:Turn_player,
            x_player:X_player
        })
    }catch(error){

        console.log(error);
    }
}

// set turn
export async function setTurnNextPLayer(Game_id:number, User_email:string){
    
    try{
        await  Games.findByPk(Game_id)
            .then((game:any) => {
                if(game !== null){
                    if(game.player_1 === User_email){
                    Games.update({turn_player:game.player_2},{where: {game_id:Game_id}})
                }else{
                    Games.update({turn_player:game.Player_1},{where: {game_id:Game_id}})
                }

            }
        })
    }catch(error){

        console.log(error);
    }
}

// set abbandoned
export async function setAbbandonedGame(Game_id:number, Player:string){
    
    try{
        let index:number;

        await Games.findByPk(Game_id).then((game:any) => {

            if(game != null && game.player_1 === Player){
                
                index = 2;

            }else if(game != null && game.player_2 == Player){
                
                index = 3;

            }else{

                index == null;

            }

            if( index != null ){
                
                Games.update({
                    status: Values.status_game[index]},{
                        where:{game_id: Game_id}
                    })
                }
        })

    }catch(error){

        console.log(error);
    }
    
}