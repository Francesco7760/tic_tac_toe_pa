require('dotenv').config();

const express = require('express');
const fs = require('fs');
const https = require('https');

import * as Cow from "./components/middleware/chain_of_responsibility";

import * as Controller from './components/controller/controller';

// Network constants
const PORT = 8080;
const HOST = '0.0.0.0';

var certificate = fs.readFileSync('cert.pem', 'utf8');
var privateKey  = fs.readFileSync('key.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
app.use(express.json());
let httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, HOST, () => {
    console.log(`App listening on port ${HOST}:${PORT} `)
  });

    
// [V] rotta per creare una nuova partita
app.post('/creapartita', [
    Cow.check_jwt, 
    Cow.check_creapartita],
    (req:any, res:any) => { 
        Controller.createNewGame(req, res)
    });

// [V] rotta per creare una nuova mossa
app.post('/creanuovamossa',[
    Cow.check_jwt, 
    Cow.check_creanuovamossa],
    (req:any, res:any) => {
        Controller.createMove(req,res);
    });

// [V] rotta per abbandonare partita
app.post('/abbandonapartita',[
    Cow.check_jwt, 
    Cow.check_abbandonapartita],
    (req:any, res:any) => {
        Controller.abbandonedGame(req,res);
    });

// [V] rotta per vedere situazione di una data partita
app.post('/statopartita',[
    Cow.check_jwt, 
    Cow.check_statopartita], 
    (req:any, res:any) => {
        Controller.showInfoGame(req,res);
    });

// [V] rotta per per ritornare storico mosse parita
app.post('/storicomosse',[
    Cow.check_jwt,
    Cow.check_storicomosse], 
    (req:any, res:any) => {
        Controller.showMovesGame(req,res);
    });

// [V] rotta per per restituire classifica giocatori
app.post('/classifica',[
    Cow.check_classifica], 
    (req:any, res:any) => {
        Controller.showUserRanking(req,res);
});

// [V] rotta per aggiungere token a giocatore 
app.post('/aggiungitoken', [
    Cow.check_jwt,
    Cow.check_aggiungitoken], 
    (req:any, res:any) => {
        Controller.addToken(req, res);
    });