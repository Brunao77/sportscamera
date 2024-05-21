import { pool } from "./db.js";

export class ClipsModel {
  static async insert({
    title,
    clip_url,
    ts_start,
    ts_end,
    date,
    establishment_name,
    video_id,
  }) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO clips (title, clip_url, ts_start, ts_end, date, establishment_name, video_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING clip_id",
        [title, clip_url, ts_start, ts_end, date, establishment_name, video_id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  static async getById({ clip_id }) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM clips WHERE clip_id = $1",
        [clip_id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  static async getAllByVideoId({ video_id }) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM clips WHERE video_id = $1",
        [video_id]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}
