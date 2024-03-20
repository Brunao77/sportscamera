import pg from "pg";
import "dotenv/config";

export const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "sportscamera",
  user: "postgres",
  password: process.env.DB_PASSWORD,
});
