import { Users } from '../model/user';
import { MessagesEnum, getErrorMessage} from '../factory/message';

/**
 * 
 * [] ShowUserRanking ->    mostra classifica dei giocatori per numero di vittorire, riportando: 
 *                          - numero vittorie, sconfitte  
 *                          - numero vittorie, sconfitte per abbandono
 *                          - numero vittorie, sconfitte contro IA 
 * 
 * [] AddToken ->  consente di aggiunge e togliere ulteriori token ad un singolo giocatore   
 */

// classifica giocatori
export async function ShowUserRanking(req:any, res:any){

    await Users.findAll({

        attributes: [['email', 'player'],'num_win','num_win_ab','num_win_vs_ia','num_lose','num_lose_ab','num_lose_vs_ia'],
        order:[['num_win', req.body.order]]

    }).then((ranking:any) => {

        // messaggio di successo
        const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
        console.log(msg.code + ' : ' + msg.message);
        res.status(msg.code).json({ranking});
    })
}

// aggiunge token
export async function AddToken(req:any, res:any){

    try{

        Users.increment(['token'], 
                {by: Number(req.body.token_add), 
                    where: {email:req.body.opponent}})
                    // se non ci sono problemi nel aggiunta di token
                    // messaggio di successo
                    const msg = getErrorMessage(MessagesEnum.AddTokenSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);

                }catch(err){

                    // se nel operazione di incremento qualcosa è andato storto
                    // messaggio di errore
                    const msg = getErrorMessage(MessagesEnum.genericSuccess).getMessage();
                    console.log(msg.code + ' : ' + msg.message);
                    res.status(msg.code).json(msg.message);
                }           
};