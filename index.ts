const express = require('express');
import * as Middleware_jwt from './components/middleware/middleware_jwt';
import * as Middleware_user from './components/middleware/middleware_user';
import * as Middleware_handler from './components/middleware/middlewar_handler';
import * as Controller_game from './components/controller/controller_game';
import * as Controller_user from './components/controller/controller_user';
import * as Controller_move from './components/controller/controller_move';

// Network constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

// validazione Token
app.use([
    Middleware_jwt.checkHeader,
    Middleware_jwt.checkToken,
    Middleware_jwt.verifyAndAuthenticate,
    Middleware_handler.errorHandler
]);

// validazione payload token
app.use(Middleware_jwt.checkJwtPayload)

// rotta per creare una nuova partita
app.post('/creapartita', [
    Middleware_user.checkEmailPlayer,
    Middleware_user.checkEmailOpponent,
    Middleware_user.checkOpenGame,
    Middleware_user.checkOpenGameOpponent,
    Middleware_handler.errorHandler],(req:any, res:any) => {
    Controller_game.CreateNewGame(req, res)
});

// rotta per creare una uova mossa
app.post('/creanuovamossa', (req:any, res:any) => {
    Controller_move.CreateMove(req,res);
});

// rotta per abbandonare partita
app.post('/abbandonapartita', (req:any, res:any) => {
    Controller_game.AbbandonedGame(req,res);
});

// rotta per valutare stati di una data partita
app.get('/statopartita', (req:any, res:any) => {
    Controller_game.ShowInfoGame(req,res);
});

// rotta per per ritornare storico mosse parita
app.get('/storicomosse', (req:any, res:any) => {
    Controller_move.ShowMoves(req,res);
});

// rotta per per restituire classifica giocatori
app.get('/classifica', (req:any, res:any) => {
    Controller_user.ShowUserRanking(req,res);
});

// rotta per aggiungere token a giocatore
app.post('/aggiungitoken',Middleware_user.checkAdmin, (req:any, res:any) => {
    Controller_user.AddToken(req.body.player_caricare, res.body.token, res);
});

app.listen(PORT, HOST);
console.log("Server su ${HOST} ${PORT}");


/**
 *
 var ticTacToeAiEngine = require("tic-tac-toe-ai-engine");

var gameState = ['X', '', '', 'O', '', '', 'X', 'O', ''];
var next_move = ticTacToeAiEngine.computeMove(gameState).nextBestGameState;
console.log(next_move[2]);
var json_nect_move = JSON.stringify(next_move);
console.log(json_nect_move);
 */