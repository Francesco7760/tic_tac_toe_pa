import { MessagesEnumSuccess, getSuccessMessage, messagePrint} from '../factory/message_succes';

export async function checkBodyCreapartita(req:any,res:any,next:any) {
    
    try{
        if(
            typeof req.body.opponent == "string" 
        ){
            const msg = getSuccessMessage(MessagesEnumSuccess.checkBodyCreapartitaSuccess).getMessage();
            messagePrint(msg, res)
            next();
        }
    }catch(error){

        messagePrint(error, res)
    }
}

export async function checkBodyAggiungitoken(req:any,res:any,next:any) {
    
    try{    
        if(
            typeof req.body.opponent == "string" &&  Number.isInteger(req.body.token_add)
        ){
            const msg = getSuccessMessage(MessagesEnumSuccess.checkBodyAggiungitokenSuccess).getMessage();
            messagePrint(msg, res)
            next();
        }
    }catch(error){

        messagePrint(error, res)
    }
}

export async function checkBodyCreanuovamossa(req:any,res:any,next:any) {
    
    try{
        if(
            Number.isInteger(req.body.position) && req.body.position >= 0 && req.body.position <= 8
        ){
            const msg = getSuccessMessage(MessagesEnumSuccess.checkBodyCreanuovamossaSuccess).getMessage();
            messagePrint(msg, res)
            next();
        }
    }catch(error){

        messagePrint(error, res)
    }
}

export async function checkBodyStatopartita(req:any,res:any,next:any) {
    
    try{
        if(
            Number.isInteger(req.body.game_id)
        ){
            const msg = getSuccessMessage(MessagesEnumSuccess.checkBodyStatopartitaSuccess).getMessage();
            messagePrint(msg, res)
            next();
        }
    }catch(error){

        messagePrint(error, res)
    }
}

export async function checkBodyStoricomosse(req:any,res:any,next:any) {
    
    try{
        if(
            Number.isInteger(req.body.game_id) && typeof req.body.format == "string" &&
            typeof req.body.start_date == "string" && typeof req.body.finish_date == "string"
        ){
            const msg = getSuccessMessage(MessagesEnumSuccess.checkBodyStoricomosseSuccess).getMessage();
            messagePrint(msg, res)
            next();
        }
    }catch(error){

        messagePrint(error, res)
    }
}

export async function checkBodyClassifica(req:any,res:any,next:any) {

    try{
        if(
            typeof req.body.order == "string"
        ){
            const msg = getSuccessMessage(MessagesEnumSuccess.checkBodyClassificaSuccess).getMessage();
            messagePrint(msg, res)
            next();
        }
    }catch(error){

        messagePrint(error, res)
    }
}