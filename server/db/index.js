import { db } from "../config";
import mysql from "mysql2";

var connection;

const connectToDatabase = async () => {
  connection = mysql.createConnection(db);
  await connection.connect();
};

export { connectToDatabase, connection };
