const db_connection = require('src/singleton/db_connection');
const moveModel = require('src/model/move');
import { Sequelize } from "sequelize";

const sequelize: Sequelize = db_connection.getConnection();

// crea una nuova mossa
export async function CreateMove(req:any, res:any){}

// mostra storico mosse
export async function ShowMoves(req:any, res:any){}
