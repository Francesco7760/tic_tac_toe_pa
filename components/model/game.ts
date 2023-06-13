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
        defaultValue: 1
    },
    game_abandoned:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    winner:{
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
        }},
    x_player:{       
        type: DataTypes.STRING,
        references:{
            model:Users,
            key:'email'
        }},
    game_state_last:{
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue:['', '', '', '', '', '', '', '', '']} 
},{
    modelName:'games',
    timestamps: false
});

// set game
export async function newGame(Player_1:string, Player_2:string, Turn_player:string, X_player:string){
    await Games.create(
        {player_1:Player_1,
        player_2:Player_2,
        turn_player:Turn_player,
        game_open:true,
        game_abandoned:false,
        x_player:X_player}
    );
}

// set winner e patita terminata (non open e non abbandonata)
export async function setWinner(Game_id:number, User_email:string){
    
    await  Games.findByPk(Game_id)
        .then((game:any) => {
            if(game != null){
                Games.update({[Op.and]:
                                [{game_abandoned: 1},{game_open:1},{winner:User_email}]},
                                    {where: {game_id:Game_id}})
            }
    })
}

// set turn
export async function setTurnNextPLayer(Game_id:number, User_email:string){
    
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
}

// set abbandoned
export function setAbbandonedGame(game:number){
    Games.update(
        {game_abandoned: 1}, {
            where:{
                game_id: game
            }
        });
}