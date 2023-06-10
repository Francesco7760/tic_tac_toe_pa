const express = require('express');
import * as middleware from './src/middleware/middleware_jwt';
import * as controller_game from './src/controller/controller_game';
import * as controller_user from './src/controller/controller_user';
import * as controller_move from './src/controller/controller_move';

// Network constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

// validazione e check token
app.use([
    middleware.checkHeader,
    middleware.checkToken,
    middleware.verifyAndAuthenticate,
    middleware.checkJwtPayload
]);

// rotta per creare una nuova partita
app.post('/creapartita',(req:any, res:any) => {
    controller_game.CreateNewGame(req,res);
});
// rotta per creare una uova mossa
app.post('/creanuovamossa', (req:any, res:any) => {
    controller_move.CreateMove(req,res);
});

// rotta per abbandonare partita
app.post('/abbandonapartita', (req:any, res:any) => {
    controller_game.AbbandonedGame(req,res);
});

// rotta per valutare stati di una data partita
app.get('/statopartita', (req:any, res:any) => {
    controller_game.ShowInfoGame(req,res);
});

// rotta per per ritornare storico mosse parita
app.get('/storicomosse', (req:any, res:any) => {
    controller_move.ShowMoves(req,res);
});

// rotta per per restituire classifica giocatori
app.get('/classifica', (req:any, res:any) => {
    controller_user.ShowUserRanking(req,res);
});

// rotta per aggiungere token a giocatore
app.post('/aggiungitoken', (req:any, res:any) => {
    controller_user.AddToken(req,res);
});

app.listen(PORT, HOST);
console.log("Server su ${HOST} ${PORT}");


