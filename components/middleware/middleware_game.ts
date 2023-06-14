import { Games } from '../model/game';
import { MessagesEnum, getErrorMessage} from '../factory/message';

/**
 * [] checkGameExists ->    verifica se la partita considerata sia presente in database
 *                          in caso affermativo si prosengue con la richiesta 
 */


export async function checkGameExists(req:any,res:any,next:any){
    
    // cerca partita desiderata
    await Games.findOne({
        where:{game_id:req.body.game_id}
        }).then((game:any) => {
            if(game == null){

                // se partita non esiste 
                // messaggio di errore
                const msg = getErrorMessage(MessagesEnum.checkGameExistsErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }else{

                // se partita esiste
                // successo
                console.log(' game exists ');
                next();    
        }
    })
}

