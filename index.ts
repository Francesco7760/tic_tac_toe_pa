const express = require('express');
const dotenv = require('dotenv');
const middleware = require('src/middleware/middleware_cor');

// Network constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

// validazione e check token
app.use(middleware.tokeJwtFilter);

// rotta per creare una nuova partita
// rotta per creare una uova mossa
// rotta per abbandonare partita
// rotta per valutare una data partita
// rotta per per ritornare storico mosse parita
// rotta per per restituire classifica giocatori

app.listen(PORT, HOST);
console.log('Server su ${HOST} ${PORT}');


