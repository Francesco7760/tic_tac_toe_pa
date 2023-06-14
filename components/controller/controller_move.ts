import{Games, setTurnNextPLayer} from '../model/game';
import {Moves, newMove } from '../model/move';
import { Op } from "sequelize";
import { MessagesEnum, getErrorMessage} from '../factory/message';
import { Users } from '../model/user';
const parse_csv = require('json2csv');
const ttt_engine = require("tic-tac-toe-ai-engine");

/**
 * [] CreateMove ->     crea una nuova mossa nella partita attiva del giocatore che ne fa richiesta
 *                      inoltre verifica se la mossa è consentita, controllando se la casella sia libera
 *                      e dopo ogni mossa controlla se porta alla vittoria.
 *                      nel caso di mossa vittoriosa aggiorna il vincotore della partita, il numero di parite
 *                      vinte e perse per i corrispettivi giocatori
 * 
 * [] ShowMovesGame ->  per ogni partita (aperta o abbandonata che sia) mostra le mosse effettuate
 *                      riportando varie informazioni consideradno uno specifico periodo temporale 
 *                      (data inizio e data fine)
 */

// crea una nuova mossa
export  async function CreateMove(req:any, res:any){
    
    // cerca patita aperta per l'utente
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
            
            // se la cella scelta per la nuova mossa non è occupata
            if(position == ``){
                
                if(game.x_player == req.user ){

                    // effetta la mossa desiderata con X
                    game_state_last_array.splice(req.body.position, 0, `X`)
         
                }else{
                    // effetta la mossa desiderata con O
                    game_state_last_array.splice(req.body.position, 0, `O`)
    
                }
                 
                // crea nuova mossa associata alla partita
                newMove(req.user, game.game_id, game_state_last_array);
                // aggiorana utlima mossa effettuta nel partita
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

                // cambia turn giocatore nella partita
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
    
    // cerca tutte le mosse di una data partita
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

            // se richiesta è di avere una risposta in json
            if(req.body.format == "text/json"){

            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).send({moves});

            }else if(req.body.format == "text/csv"){
                
                // nel caso di risposta in formato csv
                let csv_message = parse_csv.parse({moves});

                // messaggio di successp
                const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).send(csv_message);
            }else{

                //messaggio di errore
                const msg = getErrorMessage(MessagesEnum.ShowMovesGameFormatErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
        }else{

            // messaggio di errore
            const msg = getErrorMessage(MessagesEnum.ShowMovesGameErr).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
}

