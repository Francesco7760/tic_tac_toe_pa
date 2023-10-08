import { Games } from '../model/game';

import { MessagesEnumError, getErrorMessage} from '../factory/message_errors';
import { MessagesEnumSuccess, getSuccessMessage, messagePrint} from '../factory/message_succes';


export async function checkGameExists(req:any,res:any,next:any){
    
    // cerca partita desiderata
    await Games.findOne({
        where:{game_id:req.body.game_id}
        }).then((game:any) => {
            if(game == null){

                // se partita non esiste 
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnumError.checkGameExistsError).getMessage();
                messagePrint(msg, res);
            }else{

                // se partita esiste
                // successo
                const msg = getSuccessMessage(MessagesEnumSuccess.checkGameExistsSuccess).getMessage();
                messagePrint(msg, res);
                next();    
        }
    })
}

