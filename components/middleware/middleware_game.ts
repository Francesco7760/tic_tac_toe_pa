import { Games } from '../model/game';
import { MessagesEnum, getErrorMessage} from '../factory/message';

// [] verifica se partita esiste
export async function checkGameExists(req:any,res:any,next:any){
    await Games.findOne({
        where:{game_id:req.body.game_id}
        }).then((game:any) => {
            if(game == null){

                const msg = getErrorMessage(MessagesEnum.checkGameExistsErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }else{

                // messaggio successo
                next();
                const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);    
        }
    })
}

