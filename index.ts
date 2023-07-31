const express = require('express');
const fs = require('fs');
const https = require('https');

import * as Middleware_jwt from './components/middleware/middleware_jwt';
import * as Middleware_user from './components/middleware/middleware_user';
import * as Middleware_game from './components/middleware/middleware_game';
import * as Controller_game from './components/controller/controller_game';
import * as Controller_user from './components/controller/controller_user';
import * as Controller_move from './components/controller/controller_move';

// Network constants
const PORT = 8080;
const HOST = '0.0.0.0';

var certificate = fs.readFileSync('cert.pem', 'utf8');
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
let httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, HOST, () => {
    console.log(`App listening on port ${HOST}:${PORT} `)
  });

console.log("Server on " + HOST + ":" + PORT);

app.get('/', (req:any, res:any) => {
    res.send('tictactoe game');
  });
  
// [V] rotta per creare una nuova partita
app.post('/creapartita', [
    Middleware_jwt.check_jwt,
    Middleware_user.checkEmailPlayer,
    Middleware_user.checkEmailOpponent,
    Middleware_user.checkOpenGame,
    Middleware_user.checkOpenGameOpponent,
    Middleware_user.checkTokenPlayer,
    Middleware_user.checkTokenOpponent],
    (req:any, res:any) => { 
        Controller_game.CreateNewGame(req, res)
    });

// [V] rotta per creare una nuova mossa
app.post('/creanuovamossa',[
    Middleware_jwt.check_jwt,
    Middleware_user.checkWithOpenGame,
    Middleware_user.checkTokenMove,
    Middleware_user.checkYourTurn],
    (req:any, res:any) => {
        Controller_move.CreateMove(req,res);
    });

// [V] rotta per abbandonare partita
app.get('/abbandonapartita',[
    Middleware_jwt.check_jwt,
    Middleware_user.checkEmailPlayer,
    Middleware_user.checkWithOpenGame],
    (req:any, res:any) => {
        Controller_game.AbbandonedGame(req,res);
    });

// [V] rotta per vedere situazione di una data partita
app.post('/statopartita',
    Middleware_jwt.check_jwt,
    Middleware_game.checkGameExists, (req:any, res:any) => {
    Controller_game.ShowInfoGame(req,res);
});

// [V] rotta per per ritornare storico mosse parita
app.post('/storicomosse',
Middleware_jwt.check_jwt,
    Middleware_game.checkGameExists, (req:any, res:any) => {
    Controller_move.ShowMovesGame(req,res);
});

// [V] rotta per per restituire classifica giocatori
app.post('/classifica', (req:any, res:any) => {
    Controller_user.ShowUserRanking(req,res);
});

// [V] rotta per aggiungere token a giocatore 
app.post('/aggiungitoken',[
    Middleware_jwt.check_jwt,
    Middleware_user.checkAdmin,
    Middleware_user.checkEmailOpponent
    ], (req:any, res:any) => {
    Controller_user.AddToken(req, res);
});