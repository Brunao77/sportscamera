import pg from "pg";

export const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "sportscamera",
  user: "postgres",
  password: import.meta.env.DB_PASSWORD,
});
