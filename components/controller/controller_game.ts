import { Users, incrementToken } from '../model/user';
import { Games , newGame} from '../model/game';
import { Op } from "sequelize";
import { MessagesEnum, getErrorMessage} from '../factory/message_errors';

import * as Values from "../utils/values"

// crea una nuova partita da giocare
export async function CreateNewGame(req:any, res:any){

    try{
        
        if(req.body.opponent === Values.vs_computer){
                // sottrai token
                incrementToken(req.user, -Number(Values.price_new_game_IA));
                // crea partita contro IA
                newGame(req.user, Values.vs_computer, req.user, req.user);

                // messaggio di successo
                const msg = getErrorMessage(MessagesEnum.gameCreateSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            else{       
                // sottrai token ad entrambi
                incrementToken(req.user, -Number(Values.price_new_game));
                incrementToken(req.body.opponent, -Number(Values.price_new_game)); 
                // crea partita contro avversario
                newGame(req.user, req.body.opponent, req.user, req.user);

                // messaggio di successo
                const msg = getErrorMessage(MessagesEnum.gameCreateSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
        }}
        catch(error){
            console.log(error);
        }                
}

// abbandona partita
export async function AbbandonedGame(req:any, res:any){

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
                    const msg = getErrorMessage(MessagesEnum.abbandonedGameSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);

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
                    const msg = getErrorMessage(MessagesEnum.abbandonedGameSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);
                }else{

                    //messaggio di errore
                    const msg = getErrorMessage(MessagesEnum.AbbandonedGameErr).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);
                }
            })}catch(error){
                console.log(error);
            }
    
}

// mostra informazioni sulla partita 
export async function ShowInfoGame(req:any, res:any){
  
    try{
    // cerca la partita desiderata
    await Games.findOne({
        attributes: ['player_1','player_2','game_open','game_abandoned','winner'],

        where:{game_id: req.body.game_id}
    }).then((game:any) => {
        if(game == null){

            // se la partita desiderata non esiste 
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnum.genericError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }else{

            // se la partita desiderata esiste 
            // messaggio di successo
            const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json({game});
        }
    })
    }catch(error){
        console.log(error)
    }
}