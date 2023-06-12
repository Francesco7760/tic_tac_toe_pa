const jwt = require('jsonwebtoken');
import { Users } from '../model/user';
import { Games } from '../model/game';
import { MessagesEnum, getErrorMessage} from '../factory/message';
import { Op, where } from "sequelize";

// verifica se partita esiste
export async function checkGameExists(req:any,res:any,next:any){
    await Games.findOne({
        where:{game_id:req.body.game_id}
        }).then((game:any) => {
            if(game == null){

                const msg = getErrorMessage(MessagesEnum.checkGameExistsErr).getMessage();
                console.log(msg.code + ' : ' + msg.message);
                res.status(msg.code).json(msg.message);
            }else{

                console.log("partita trovata");
                next();
        }
    })
}

