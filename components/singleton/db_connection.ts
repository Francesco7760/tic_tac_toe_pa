import {Sequelize} from 'sequelize';

//singleton pattern implementation
export class db_connection {
    //istance singleton DbConnection
    private static instance: db_connection;
    private connection: Sequelize;
    //default constructor
    private constructor() {
        //istance Sequelize object as connectio
		this.connection = new Sequelize('tictactoe', 'root', 'password', {
			host: 'db_mysql',
			port: 3306,
			dialect: 'mysql'
		}); 

         
	}
    //getConnection method
    public static getConnection(): Sequelize {
        //if it is first initialization create DbConnection object
        if (!db_connection.instance) {
          db_connection.instance = new db_connection();
        }
        //return object
        return db_connection.instance.connection;
    }

} 