import { DataTypes, Sequelize } from "sequelize"; 
import { db_connection } from '../singleton/db_connection';

// connette al db
const sequelize: Sequelize = db_connection.getConnection();

/**
 * [] Users -> model 'user'
 */

export const Users = sequelize.define('users',{
    email:{
        type:DataTypes.STRING,
        primaryKey: true,
    },
    role:{
        type:DataTypes.STRING,
        allowNull: false,
    }, 
    token:{
        type:DataTypes.REAL,
        defaultValue:0,
    }, 
    num_win:{        
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    num_win_ab:{        
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    num_win_vs_ia:{        
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    num_lose:{        
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    num_lose_ab:{        
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    num_lose_vs_ia:{        
        type:DataTypes.INTEGER,
        defaultValue:0,
    }
},
{
    modelName: 'users',
    timestamps: false
});
