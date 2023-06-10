import { DataTypes, Sequelize } from "sequelize"; 
import { db_connection } from '../singleton/db_connection';

// connette al db
const sequelize: Sequelize = db_connection.getConnection();

/**
 * definizione del model 'user'
 */
export const Users = sequelize.define('users',{
    email:{
        type:DataTypes.STRING,
        primaryKey: true,
    },
    admin_role:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }, 
    token:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    }, 
},
{
    modelName: 'users',
    timestamps: false
});

// verifica se utente è amministratore
export async function checkUserAdmin(user_email:string):Promise<boolean> {
    let user:any
    try{
        user == await Users.findByPk(user_email,{raw:true})
    }catch(err){
        console.log(err);
    }
    if(!user) return false;
    if(user.admin_role === true) return true;
    else return false;

}

// set nuovo giocatore
export function newPlayer(Email:string,Admin:boolean,Token:number):void{
     Users.create({
        email:Email,
        admin_role:Admin,
        token:Token,
    }); 
}

// get token by player
export function getTokenByPlayer(user_email:string):number {
    let token:any
    try{
        token ==  Users.findOne({
            raw:true,
            attributes: ['token'],
            where: {
                email:user_email
            }})
    }catch(err){
        console.log(err);
    }
    if(!user_email) return 0;
    if(token === null) return token;
    else return 0;

}

// get player da email
export function getPlayerByEmail(email_player:string):any {
    let player:any;
    try{
        player == Users.findOne({
            raw:true,
            attributes: ['winner'],
            where: {
                email:email_player
            }
        })
    }catch(err){
        console.log(err);
    }
    if(!email_player) return null;
    if(player !==  null) return player;
    else return null;
}


