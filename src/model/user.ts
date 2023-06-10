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
export async function newPlayer(Email:string,Admin:boolean,Token:number):Promise<void>{
    await Users.create({
        email:Email,
        admin_role:Admin,
        token:Token,
    }); 
}

// get token by player
export async function getTokenByPlayer(user_email:string):Promise<any> {
    let token:any
    try{
        token == await Users.findOne({
            raw:true,
            attributes: ['token'],
            where: {
                email:user_email
            }})
    }catch(err){
        console.log(err);
    }
    if(!user_email) return null;
    if(token === true) return token;
    else return null;

}
