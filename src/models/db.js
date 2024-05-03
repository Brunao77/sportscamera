import pg from "pg";

const { PGCONNECTIONSTRING } = import.meta.env;

export const pool = new pg.Pool({
  connectionString: PGCONNECTIONSTRING,
});
