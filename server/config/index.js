import dotenv from "dotenv";

dotenv.config();

const db = {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
};

export { db };
