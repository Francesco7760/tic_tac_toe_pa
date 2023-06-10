const express = require('express');


// Network constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

// validazione e check token
//app.use(middleware.tokeJwtFilter);

// rotta per creare una nuova partita
//app.post(('/createnewgame',[vari check],(req:any, rea:any))=> {
//  controller.CreateNewGames(req,res);
//});

// rotta per creare una uova mossa
// rotta per abbandonare partita
// rotta per valutare una data partita
// rotta per per ritornare storico mosse parita
// rotta per per restituire classifica giocatori

//const user =  Game.newGame('ciao','arrivederci');



app.listen(PORT, HOST);
console.log("Server su ${HOST} ${PORT}");


