import { pool } from "./db.js";

export class CameraModel {
  static async getAll({ establishment_id }) {
    // GET ALL CAMERAS IN THE ESTABLISHMENT
    try {
      const { rows } = await pool.query(
        "SELECT * FROM cameras WHERE establishment_id = $1",
        [establishment_id]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async getByName({ establishment_id, field_name }) {
    // GET CAMERA IN THE ESTABLISHMENT FOR THE FIELD
    try {
      const field_name_lower = field_name.toLowerCase();
      const { rows } = await pool.query(
        "SELECT * FROM cameras WHERE establishment_id = $1 AND LOWER(field_name) = $2",
        [establishment_id, field_name_lower]
      );
      console.log(rows);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}
