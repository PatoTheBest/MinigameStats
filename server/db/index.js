import { db } from "../config";
import mysql from "mysql2";

var connectionPool;

const connectToDatabase = async () => {
  connectionPool = await mysql.createPool(db);
};

const getConnection = (callback) => {
  connectionPool.getConnection((err, conn) => {
    callback(err, conn);
  });
};

export { connectToDatabase, getConnection };
