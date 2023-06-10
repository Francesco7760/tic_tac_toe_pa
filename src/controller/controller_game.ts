require('dotenv').config();
const db_connection = require('src/singleton/db_connection');
const userModel = require('src/model/user');
const gameModel = require('src/model/game');
const moveModel = require('src/model/move');
import { Sequelize } from "sequelize";
const jwt = require('jsonwebtoken');

const sequelize: Sequelize = db_connection.getConnection();

// crea una nuova partita da giocare
export async function CreateNewGame(req:any, res:any){}

// abbandona partita
export async function AbbandonedGame(req:any, res:any){}

// mostra informazioni sulla partita 
export async function ShowInfoGame(req:any, res:any){}
