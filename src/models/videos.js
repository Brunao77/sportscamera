import { pool } from "./db.js";

export class VideosModel {
  static async getById({ video_id }) {
    try {
      const { rows } = await pool.query(
        `SELECT *
         FROM videos
         WHERE video_id = $1`,
        [video_id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  static async getAll({ establishment_id }) {
    try {
      const { rows } = await pool.query(
        `SELECT videos.video_id, videos.date, videos.start_time, videos.end_time, videos.video_url, videos.camera_id, cameras.field_name 
         FROM videos, cameras 
         WHERE cameras.establishment_id = $1 AND videos.camera_id = cameras.camera_id 
         ORDER BY videos.date DESC, videos.start_time DESC`,
        [establishment_id]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async getOne({ date, start_time, end_time, camera_id }) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM videos WHERE date = $1 AND start_time = $2 AND end_time = $3 AND camera_id = $4",
        [date, start_time, end_time, camera_id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  static async getVideoTurns({ camera_id, date }) {
    try {
      const { rows } = await pool.query(
        `SELECT videos.video_id, videos.date, videos.start_time, videos.end_time, videos.video_url, videos.camera_id, cameras.field_name
         FROM videos, cameras
         WHERE videos.date = $1 AND videos.camera_id = $2 AND videos.camera_id = cameras.camera_id
         ORDER BY videos.start_time DESC`,
        [date, camera_id]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async delete({ video_id }) {
    try {
      const { rowCount } = await pool.query(
        "DELETE FROM videos WHERE video_id = $1",
        [video_id]
      );
      return rowCount;
    } catch (error) {
      console.log(error);
    }
  }
  static async insert({ date, start_time, end_time, video_url, camera_id }) {
    try {
      const row = await pool.query(
        "INSERT INTO videos(date, start_time, end_time, video_url, camera_id) VALUES ($1, $2, $3, $4, $5);",
        [date, start_time, end_time, video_url, camera_id]
      );
      return row;
    } catch (error) {
      console.log(error);
    }
  }
}
