const express = require('express');
import * as middleware from './components/middleware/middleware_jwt';
import * as Controller_game from './components/controller/controller_game';
import * as Controller_user from './components/controller/controller_user';
import * as Controller_move from './components/controller/controller_move';

// Network constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

// validazione e check token
//app.use([
//    middleware.checkHeader,
//    middleware.checkToken,
//    middleware.verifyAndAuthenticate,
//    middleware.checkJwtPayload
//]);

// rotta per creare una nuova partita
app.post('/creapartita',(req:any, res:any) => {
    Controller_game.CreateNewGame(req,res);
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
app.post('/aggiungitoken', (req:any, res:any) => {
    Controller_user.AddToken(req.body.player,req.body.token,res);
});

app.listen(PORT, HOST);
console.log("Server su ${HOST} ${PORT}");


