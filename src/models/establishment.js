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
  static async getById({ establishment_id }) {
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
  static async update({ establishment_id, name, address, phone }) {
    try {
      const { rows } = await pool.query(
        `UPDATE establishments
        SET name = $1, address = $2, phone = $3
        WHERE establishment_id = $4`,
        [name, address, phone, establishment_id]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
