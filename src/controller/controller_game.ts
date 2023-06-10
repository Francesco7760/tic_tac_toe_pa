require('dotenv').config();
const db_connection = require('src/singleton/db_connection');
const userModel = require('src/model/user');
const gameModel = require('src/model/game');
const moveModel = require('src/model/move');
import { Sequelize } from "sequelize";
const jwt = require('jsonwebtoken');

const sequelize: Sequelize = db_connection.getConnection();

// crea una nuova partita
export async function CreateNewGame(req: any, res: any) {
     
    const decode:any = jwt.decode(req.headers.authorization)
    var player = decode.email;
    var opponent = decode.player_2;
    const playerInMatch = await gameModel.getOpenGame(player)
    const token = await userModel.getToken(player);
    if(opponent !== 'IA'){
        if(playerInMatch == null){
            // verifiche su avversario
            let player_2 = await userModel.getUser(opponent);
            if(player_2 == null || opponent == player){
            // errore nel fare la richiesta, email avversario sbagliata
            } else {
                const opponentInMatch = await gameModel.getOpenGame(opponent);
                if(opponentInMatch != null){
                    // avversario ha partite aperte 'open_game'
                }
            }
        }
        // giocatore non ha partite aperte
        // partita contro avversario
        // verifica dei token
        if(token != null && (Number(token.token)>=0.75)){
            await userModel.setToken(player, (Number(token.token)-0.75))
            // crea nuova partita
            const game = await gameModel.newGame(player. opponent);
            // crea mossa iniziale
            } else {
            // giocatore non ha abbastanza token
    }
} else {
    // partita contro IA
    // verifica token
    if(token != null && (Number(token.token)>=0.5)){
        await userModel.setToken(player, (Number(token.token)-0.5))
        // crea nuova partita
        const game = await gameModel.newGame(player. opponent);
        // crea mossa iniziale
        } else {
            // giocatore non ha abbastanza token
            }
    }
}

// gioca la partita aperta 
// (first_position -> posizione di OX come prima mossa)
export async function PlayGame(req: any, res: any){
    // validare l'email del player (jwt)
    const decode:any = jwt.decode(req.headers.authorization);
    var player = decode.emial;
    const playerInMatch = await gameModel.getOpenGame(player)
    // controllare se player ha partite aperte
    if(playerInMatch !== null){
        var game_moves = await moveModel.getMoves(playerInMatch);
        if(game_moves == null){
            // partita mai giocata
            var game_state = ['','','','','','','','','']
            await ShowGameState(game_state);
            // giocatore fa prima mossa
            PayMove(player, 0.015);
            var move = await CreateMove(playerInMatch.game_id,player,'X',req.body.position);
            const result = await  CheckWinner(playerInMatch.game_id);
        }
    }
    
    // controlla se c'è un vincitore
    // se contro IA -> mossa con engine
    // se con player -> mossa player 2
    // controlla di nuovo se c'è un vincitore
}

// player fa una mossa
export async function CreateMove(match_id:any, player_email:string, OX:string, position:number){}

// paga i token per fare una mossa
export async function PayMove(player_email:string, cost_token:number){}

// verifica vincitore
export async function CheckWinner(match_id:any){}

// mostra la situazione attuale della partita
// cosi che il giocatore può decidere la sua mosa
export async function ShowGameState(game_state:any){}

// termina la partita che si sta giocando
export async function EndGame(req: any, res: any){}

// restituisce lo stato della partita
export async function StatusGame(req: any, res: any){}

// restituisce lo storico delle mosse su una data partita
export async function HistoryGame(req: any, res: any){}

// restituisce la classifica dei giocatori 
export async function RankingPlayer(req: any, res: any){}