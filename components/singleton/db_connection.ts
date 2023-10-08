import {Sequelize} from 'sequelize';

export class db_connection {

    private static instance: db_connection;
    private connection: Sequelize;
    
    private constructor() {

        if(
            !process.env.DB_NAME ||
            !process.env.DB_USER ||
            !process.env.DB_PASSWORD ||
            !process.env.DB_HOST ||
            !process.env.DB_PORT
        ) {throw new Error("variabili .env non configurate");
        }
        
		this.connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			dialect: 'mysql'
		}); 

         
	}
    
    public static getConnection(): Sequelize {
        
        if (!db_connection.instance) {
          db_connection.instance = new db_connection();
        }
        
        return db_connection.instance.connection;
    }

} 