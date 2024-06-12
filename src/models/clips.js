import { pool } from "./db.js";

export class ClipsModel {
  static async insert({
    title,
    key,
    clip_url,
    date,
    establishment_name,
    video_id,
    clip_duration,
    clip_offset,
    ts_start,
    ts_end,
  }) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO clips (title, key, clip_url, date, establishment_name, video_id, clip_duration, clip_offset, ts_start, ts_end) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING clip_id",
        [
          title,
          key,
          clip_url,
          date,
          establishment_name,
          video_id,
          clip_duration,
          clip_offset,
          ts_start,
          ts_end,
        ]
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
