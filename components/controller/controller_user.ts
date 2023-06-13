import { Users } from '../model/user';
import { MessagesEnum, getErrorMessage} from '../factory/message';


// [] classifica giocatori
export async function ShowUserRanking(req:any, res:any){
    await Users.findAll({

        attributes: [['email', 'player'],'num_win','num_win_ab','num_win_vs_ia','num_lose','num_lose_ab','num_lose_vs_ia'],
        order:[['num_win', req.body.order]]

    }).then((ranking:any) => {

        const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
        console.log(msg.code + ' : ' + msg.message);
        res.status(msg.code).json({ranking});
    })
}

// [] aggiungi token
export async function AddToken(req:any, res:any){
    try{
        Users.increment(['token'], 
                {by: Number(req.body.token_add), 
                    where: {email:req.body.opponent}})

                    // messaggio di successo
                    const msg = getErrorMessage(MessagesEnum.AddTokenSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);

                }catch(err){

                    // messaggio di errore
                    const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);
                }           
};