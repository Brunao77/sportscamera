import { pool } from "./db.js";

export class CameraModel {
  static async getById({ camera_id }) {
    // GET ALL CAMERAS IN THE ESTABLISHMENT
    try {
      const { rows } = await pool.query(
        "SELECT * FROM cameras WHERE camera_id = $1",
        [camera_id]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
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
  static async updateName({ camera_id, field_name }) {
    try {
      const { rows } = await pool.query(
        `UPDATE cameras
        SET field_name = $1
        WHERE camera_id = $2`,
        [field_name, camera_id]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
