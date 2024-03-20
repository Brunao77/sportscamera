import { pool } from "./db.js";

export class EstablishmentModel {
  static async getAll() {
    try {
      const { rows } = await pool.query("SELECT * FROM establishments");
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async getOne({ establishment_id }) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM establishments WHERE establishment_id = $1",
        [establishment_id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}
