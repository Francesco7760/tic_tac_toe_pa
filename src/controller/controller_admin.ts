const db_connection = require('src/singleton/db_connection');
const userModel = require('src/model/user');

export async function IncreaseToken(email: string, token:number ,res: any){
    const player = await userModel
    if(player != null){
        await userModel.setToken(email, Number(token))
        // messaggio successo
    } else {
        // messaggio di errore
    }
}