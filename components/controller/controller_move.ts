import{Games, setTurnNextPLayer} from '../model/game';
import {Moves, newMove } from '../model/move';
import { Op } from "sequelize";
import { MessagesEnum, getErrorMessage} from '../factory/message';
import { Users } from '../model/user';
const parse_csv = require('json2csv');
const ttt_engine = require("tic-tac-toe-ai-engine");

// [] crea una nuova mossa
export  async function CreateMove(req:any, res:any){

  await Games.findOne({        
        where:{
        [Op.and]: [{game_open: 1},
            {
        [Op.or]:[{player_1:req.user},{player_2:req.user}]
            }]
            }
        }).then((game:any) => {

            // ultima mossa fatta in partita
            let game_state_last_array = JSON.parse(game.game_state_last);
            // verifico se posizione in gmae_state sia disponibile
            let position = game_state_last_array[req.body.position];

            if(position == ``){
                
                if(game.x_player == req.user ){

                    // effetta la mossa desideratacon X
                    game_state_last_array.splice(req.body.position, 0, `X`)
         
                }else{
                    // effetta la mossa desideratacon X
                    game_state_last_array.splice(req.body.position, 0, `O`)
    
                }
                 
                newMove(req.user, game.game_id, game_state_last_array);
                Games.update({game_state_last:game_state_last_array},{where:{game_id:game.game_id}})
                
                // messaggio di successo 
                const msg = getErrorMessage(MessagesEnum.CreateMoveSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);

                if(ttt_engine.determineWinner(game_state_last_array) == req.user){
                    // imposta vincitore
                    Games.update({winner:req.user},{where:{game_id:game.game_id}});
                    // imposta numero partite vinte
                    Users.increment(['num_win'], {by:1, where:{email:req.user}})
                    // imposta partita chiusa
                    Games.update({game_open:1},{where:{game_id:game.game_id}});
                    // imposta partita non abbandonata
                    Games.update({game_abandoned:1},{where:{game_id:game.game_id}});
                    
                    // messaggio vincita
                    const msg = getErrorMessage(MessagesEnum.winGameSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);

                }else{
                // cambia turn nella partita
                setTurnNextPLayer(game.game_id, req.user)
            }

        }else{
                // mesasggio mossa non consentita
                const msg = getErrorMessage(MessagesEnum.CreateMoveErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);  
            }
           
        })

}

// mostra storico mosse di una data partita 
export async function ShowMovesGame(req:any, res:any){
    await Moves.findAll({
        attributes : ['player','game','game_state','start'],
        where: {
            [Op.and]:[{game: req.body.game_id},
                {start:{
                    [Op.between]:[req.body.start_date,req.body.finish_date]
                }}
            ]}
    }).then((moves:any)=>{
        if(moves != null){
            if(req.body.format == "text/json"){

            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).send({moves});

            }else if(req.body.format == "text/csv"){

                let csv_message = parse_csv.parse({moves});

                const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).send(csv_message);
            }else{

                const msg = getErrorMessage(MessagesEnum.ShowMovesGameFormatErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
        }else{

            const msg = getErrorMessage(MessagesEnum.ShowMovesGameErr).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
}

