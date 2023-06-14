const jwt = require('jsonwebtoken');
import { Users } from '../model/user';
import { Games } from '../model/game';
import { MessagesEnum, getErrorMessage} from '../factory/message';
import { Op } from "sequelize";

/**
 * [] checkAdmin -> verifica se l'utente che fa richiesta ha privilegi da amministratore
 * 
 * [] checkEmailPlayer ->   verifica se l'utente esite, ovvero controlla se email 
 *                          associata al è presente in database
 * 
 * [] checkEmailOpponent -> verifica se l'utente avversario esite, ovvero controlla 
 *                          se email associata è presente in database
 * 
 * [] checkOpenGame ->  verifica se giocatore ha partite aperte, lo scopo è bloccare la 
 *                      richesta se giocatore ha gia partite aperte 
 * 
 * [] checkOpenGameOpponent->   verifica se giocatore ha partite aperte, lo scopo è bloccare la 
 *                              richesta se giocatore ha gia partite aperte.
 *                              se giochiamo contro IA, non ci interessa se ha gia altre partie 
 *                              attive
 * 
 * [] checkWithOpenGame ->  verifica se utente ha parite aperte, bloca la richesta se non esisto 
 *                          partite aperte
 * 
 * [] checkTokenPlayer ->   verifica se giocatore ha token(crediti) necessari per avviare una 
 *                          partita
 * 
 * [] checkTokenOpponent -> verifica se avversario ha token(crediti) necessari per avviare una 
 *                          partita
 * 
 * [] checkTokenMove -> verificase giocatore ha token(crediti) necessari per effettuare una nuova
 *                      mossa
 * 
 * [] checkYourTurn ->  verifica il turno per fare una mossa è del attuale giocatore
 */

// verifica admin
export async function checkAdmin(req:any,res:any,next:any){

    // estrapola il ruolo del giocatore dal token e lo confronta con
    // con il ruolo registrato in db
    const decoded:any = <string>jwt.decode(req.token)
    await Users.findByPk(decoded.email).then((user:any) => {
        if(user.role === decoded.role){
            
            // se i due ruoli coincidono
            // successo
            console.log("utente admin");
            next();
        }else{

            // se non coincidono
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnum.checkAdminUser).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
    }
// verifica se player esiste
export async function checkEmailPlayer(req:any,res:any,next:any){

    // cerca utente associato a quel email
    await Users.findOne({
        attributes : ['email'],
        where:{email:req.user}
    }).then((user:any) => {
        if(user == null){
            
            // se utente non trovato
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnum.checkEmailPlayerError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }else{

            // se utente trovato
            // successo
            next();
            console.log(' email player right ');
        }
    })
}

// verifica se avversario esite
export async function checkEmailOpponent(req:any,res:any,next:any){

        // cerca avversario associato a quel email
        await Users.findOne({
            attributes : ['email'],
            where:{email:req.body.opponent}
        }).then((user:any) => {
            if(user == null){
                
                // se avversario non trovato
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnum.checkEmailOpponentError).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }else{
            
            // se avversario trvato
            // successo
            console.log(' email opponent right ');
            next();
            }
        })
    }


// verifica se giocatore ha partite aperte
export async function checkOpenGame(req:any,res:any,next:any){
    
    // cerca partita aperta del giocaore
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((item:any) => {
        if(item == null){
            
            // se giocatore non ha partite aperte
            // successo
            console.log(' player without open game');
            next();
        }else{

            // se giocatore ha partite aperte
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnum.checkOpenGameError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })
}

// verifica se avversario ha partite aperte
export async function checkOpenGameOpponent(req:any,res:any,next:any){
    
    // se gioco contro IA 
    if(req.body.opponent === "IA"){
        next();
    }else{    
        
    // cerca partita aperta del avversario
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.body.opponent},{player_2:req.body.opponent}]
                }]
        }
    }).then((item:any) => {
        if(item == null){

            // se non ha partite aperte
            // successo
            console.log('opponent without open game');
            next();   
        }else{

            // se ha partite aperte
            // messaggiodi errore
            const msg = getErrorMessage(MessagesEnum.checkOpenGameOpponentError).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })}


}

// verifica se giocatore ha partite aperte (uso in /abbandonapartita) 
export async function checkWithOpenGame(req:any,res:any,next:any){
    
    // cerca partita aperta del giocatore
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((item:any) => {
        if(item == null){

            // se non esistono partite aperte
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnum.checkWithOpenGameErr).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }else{

            // se esiste una partita aperta
            // messaggio di successo
            console.log(' player with open game ');
            next();
        }
    })
}

// verifica se giocatore ha token necessari per iniziare partita
export async function checkTokenPlayer(req:any,res:any,next:any) {
    
    // cerca i token del giocatore
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.user}
    }).then((user:any) => {

        // se partita contro IA o contro utente
        if(req.body.opponent === "IA"){
            // constrolla se token sono necessari
            if(user.token >= 0.75){
                
                // crediti maggiori di 0.75
                // successo
                console.log(' player`s token right');
                next();

            }else{

                // crediti inferiori di 0.75
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnum.checkTokenPlayerErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            
        }else{
            // se partita non è contro IA 
            if(user.token >= 0.50){

                // crediti superiori di 0.5
                // successo
                console.log(' player`s token right');
                next();
            }else{

                // crediti inferiori a 0.50
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnum.checkTokenPlayerErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
        }
    })
}

// verifica se avversario ha token necessari per iniziare partita
export async function checkTokenOpponent(req:any,res:any,next:any) {

    // cerca i crediti del avversario
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.body.opponent}
    }).then((user:any) => {

        // se avversario è un utente
        if(req.body.opponent !== "IA"){

            if(user.token >= 0.75){

                // crediti superiori a 0.75
                // successo
                console.log(' oppponent`s token right');
                next();
            
        }else{
                // crediti inferiori a 0.75
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnum.checkTokenOpponentErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
            
        }else{

            // non ci sono problemi su token per IA
            // successo
            console.log(' oppponent`s token right');
            next(); 
        }
    })
}

// verifica se ci sono token necessari per fare una mossa
export async function checkTokenMove(req: any, res: any, next: any){
    
    // cerca crediti del giocatore
    await Users.findOne({
        attributes: ['token'],
        where: {email:req.user}
    }).then((user:any) => {
       
            if(user.token >= 0.015){

                // crediti superiori a 0.015
                // successo
                console.log(' player`s token right ');
                next();

            }else{

                // crediti inferiori a 0.015
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnum.checkTokenPlayerErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }
        }
    )
}

// verifica se è il turno del player
export async function checkYourTurn(req: any, res: any, next: any){

    // cerca la partita aperta del giocatore
    await Games.findOne({
        where:{
            [Op.and]: [{game_open: true},
                {
            [Op.or]:[{player_1:req.user},{player_2:req.user}]
                }]
        }
    }).then((game:any) => {
        
        //controlla chi è il prossimo a poter fare una mossa
        if(game.turn_player === req.user){

            // se è il turno dal giocatore
            // successo
            console.log(' your turn ');
            next();
            
        }else{

            // se non è il turno del giocatore
            // messaggio di errore
            const msg = getErrorMessage(MessagesEnum.checkYourTurnErr).getMessage();
            console.log(msg.code + ' : ' + msg.message);
            res.status(msg.code).json(msg.message);
        }
    })

}