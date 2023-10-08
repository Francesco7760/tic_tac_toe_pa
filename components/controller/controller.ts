import { Users, incrementToken } from '../model/user';
import { Games , newGame, setTurnNextPLayer} from '../model/game';
import {Moves, newMove } from '../model/move';

import { Op } from "sequelize";

import { MessagesEnumSuccess, getSuccessMessage, messagePrint} from '../factory/message_succes';


const parse_csv = require('json2csv');
const ttt_engine = require("tic-tac-toe-ai-engine")

import * as Values from "../utils/values"

function messageSend(msg: any, res:any, object:any){
    console.log(msg.code + ' : ' + msg.message);
    res.status(msg.code).sned({object});
}

// crea una nuova partita da giocare
export async function createNewGame(req:any, res:any){

    try{
        
        if(req.body.opponent === Values.vs_computer){
                // sottrai token
                incrementToken(req.user, -Number(Values.price_new_game_IA));
                // crea partita contro IA
                newGame(req.user, Values.vs_computer, req.user, req.user);

                // messaggio di successo   
                const msg = getSuccessMessage(MessagesEnumSuccess.createNewGameSuccess).getMessage();
                messagePrint(msg, res);
            }
            else{       

                // sottrai token ad entrambi
                incrementToken(req.user, -Number(Values.price_new_game));
                incrementToken(req.body.opponent, -Number(Values.price_new_game)); 
                // crea partita contro avversario
                newGame(req.user, req.body.opponent, req.user, req.user);

                // messaggio di successo
                const msg = getSuccessMessage(MessagesEnumSuccess.createNewGameSuccess).getMessage();
                messagePrint(msg, res);

        }}
        catch(error){
            messagePrint(error, res);
        }                
}

// abbandona partita
export async function abbandonedGame(req:any, res:any){

    try{
        // cerca la partita aperta del utente che fa la richiesta di abbandono
        await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
                }
            }).then((game:any) => {

                // caso in cui l'utente che vuole abbandonare sia 1^ giocatore (player_1)
                if(game.player_1 === req.user){
                    Games.update({
                        [Op.and]:
                        [{game_abandoned: 1},{game_open:0},
                    ]}, 
                        {where: {player_1:req.user}})

                    // imposta vincitore l'avversario
                    Games.update({winner: game.player_2}, {where: {player_1:req.user}})
                    
                    // aggiorna numero partite perse per abb. del giocatore (player_1)
                    Users.increment(['num_lose_ab'], {by:1, where:{email:req.user}})

                    // aggiorna numero partite vinte per abb. del avversario (player_2)
                    Users.increment(['num_win_ab'], {by:1, where:{email:game.player_2}})

                    // imposta il gioco come non più disponibile (game_open false)
                    Games.update({game_open: 0}, {where: {player_1:req.user}})

                    // imposta partita come abbandonate
                    Games.update({game_abandoned: 1}, {where: {player_1:req.user}})

                    // messaggio di successo
                    const msg = getSuccessMessage(MessagesEnumSuccess.abbandonedGameSuccess).getMessage();
                    messagePrint(msg, res);


                }else 

                // caso in cui l'utente che vuole abbandonare sia 2^ giocatore (player_1)
                if(game.player_2 === req.user){
                    Games.update({
                        [Op.and]:
                        [{game_abandoned: 1},{game_open:0}]},
                        {where: {player_2:req.user}})

                    // imposta vincitore l'avversario
                    Games.update({winner: game.player_1}, {where: {player_2:req.user}})
                    
                    // aggiorna numero partite perse per abb. in plater_2
                    Users.increment(['num_lose_ab'], {by:1, where:{email:req.user}})

                    // aggiorna numero partite vinte per abb. in player_1
                    Users.increment(['num_win_ab'], {by:1, where:{email:req.user}})

                    // imposta il gioco come non non più disponibile (game_open false)
                    Games.update({game_open: 0}, {where: {player_2:req.user}})
                    
                    // imposta partita come abbandonata
                    Games.update({game_abandoned: 1}, {where: {player_2:req.user}})

                    // messaggio di successo
                    const msg = getSuccessMessage(MessagesEnumSuccess.abbandonedGameSuccess).getMessage();
                    messagePrint(msg, res);

                }

            })}catch(error){
                messagePrint(error, res);
            }
    
}

// mostra informazioni sulla partita 
export async function showInfoGame(req:any, res:any){
  
    try{
    // cerca la partita desiderata
    await Games.findOne({
        attributes: ['player_1','player_2','game_open','game_abandoned','winner'],

        where:{game_id: req.body.game_id}
    }).then((game:any) => {
        if(game !== null){

            // se la partita desiderata esiste 
            // messaggio di successo
            const msg = getSuccessMessage(MessagesEnumSuccess.showInfoGameSuccess).getMessage();
            messageSend(msg, res, game);
        }
    })
    }catch(error){
        messagePrint(error, res);
    }
}

export  async function createMove(req:any, res:any){

    try{
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
                const msg = getSuccessMessage(MessagesEnumSuccess.createMoveSuccess).getMessage();
                messagePrint(msg, res);
               

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
                    const msg = getSuccessMessage(MessagesEnumSuccess.winSuccess).getMessage();
                    messagePrint(msg, res);

                }else{

                // cambia turn giocatore nella partita
                setTurnNextPLayer(game.game_id, req.user)
                }

            }
           
        })}catch(error){
            messagePrint(error, res);
        }

}

export async function showMovesGame(req:any, res:any){

    try{
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
            const msg = getSuccessMessage(MessagesEnumSuccess.showMovesGameSuccess).getMessage();
            messagePrint(msg, res);

            }else if(req.body.format == "text/csv"){
                
                // nel caso di risposta in formato csv
                let csv_message = parse_csv.parse({moves});

                // messaggio di successo
                const msg = getSuccessMessage(MessagesEnumSuccess.showMovesGameSuccess).getMessage();
                messageSend(msg, res, csv_message)
            }else{

                //messaggio di errore
                
            }
        }
    })}catch(error){
        messagePrint(error, res);
    }
}

export async function showUserRanking(req:any, res:any){
    try{
        await Users.findAll({
    
            attributes: [['email', 'player'],'num_win','num_win_ab','num_win_vs_ia','num_lose','num_lose_ab','num_lose_vs_ia'],
            order:[['num_win', req.body.order]]
    
        }).then((ranking:any) => {
            if(ranking !== null){
                // messaggio di successo
                const msg = getSuccessMessage(MessagesEnumSuccess.showUserRankingSuccess).getMessage();
                messageSend(msg, res, ranking);
            }
            
        })}
        catch(error){
            messagePrint(error, res);
        }
}
    
    // aggiungi token
export async function addToken(req:any, res:any){
    
        try{
    
            await Users.increment(['token'], 
                    {by: Number(req.body.token_add), 
                        where: {email:req.body.opponent}})
    
                        // se non ci sono problemi nel aggiunta di token
                        // messaggio di successo
                        const msg = getSuccessMessage(MessagesEnumSuccess.addTokenSuccess).getMessage();
                        messagePrint(msg, res);
    
                    }catch(error){
                        messagePrint(error, res);
                        
                    }           
}