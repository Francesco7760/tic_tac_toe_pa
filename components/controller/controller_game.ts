require('dotenv').config();
import { Users } from '../model/user';
import { Games , newGame} from '../model/game';
import { Op } from "sequelize";
import { MessagesEnum, getErrorMessage} from '../factory/message';

/**
 * [] CreateNewGame ->  crea una nuova partita considerando l'avversario umano o IA,
 *                      inoltre tiene conto dei token necesari per avviare una partita
 *                      per entrambi i giocatori   

 * [] AbbandonedGame -> permette di abbandonara la partita che l'utente che fa richiesta 
 *                      sta giocando. A partita abbandonata setta il vincitore e il numero 
 *                      di partite vinte o perse per abbandono per i 2 giocatori
 * 
 * [] ShowInfoGame ->   mostra tutte le info richieste sulle partite giocate e terminate
 *                      fino ad ora 
 */

// crea una nuova partita da giocare
export async function CreateNewGame(req:any, res:any){

        if(req.body.opponent === "IA"){
                // sottrai token
                Users.decrement(['token'], 
                {by:0.75, where: {email:req.user}})
                // crea partita
                newGame(req.user, "IA", req.user, req.user);

                // messaggio di successo
                const msg = getErrorMessage(MessagesEnum.gameCreateSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            else{       
                // sottrai token ad entrambi
                Users.decrement(['token'], 
                {by:0.5, where: {email:req.user}})
                Users.decrement(['token'], 
                {by:0.5, where: {email:req.body.opponent}})
                // crea nuova partita
                newGame(req.user, req.body.opponent, req.user, req.user);

                // messaggio di successo
                const msg = getErrorMessage(MessagesEnum.gameCreateSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
        }                
}
// abbandona partita
export async function AbbandonedGame(req:any, res:any){

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

                // caso in cui l'utente che vuole abbandonare sia 1^ giocatore (player_1)
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

                    // imposta il gioco come OPEN
                    Games.update({game_open: 1}, {where: {player_2:req.user}})
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
            })
    
}

// mostra informazioni sulla partita 
export async function ShowInfoGame(req:any, res:any){
    
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
}