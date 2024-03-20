import { pool } from "./db.js";

export class VideosModel {
  static async getAll({ camera_id }) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM videos WHERE camera_id = $1",
        [camera_id]
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
        "SELECT * FROM videos WHERE date = $1 AND camera_id = $2",
        [date, camera_id]
      );
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async existVideoTurn({ date, start_time, end_time, camera_id }) {
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
  static async delete({ video_id }) {
    try {
      const result = await pool.query(
        "DELETE FROM videos WHERE video_id = $1",
        [video_id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async create({
    date,
    start_time,
    end_time,
    name,
    video_url,
    camera_id,
  }) {
    try {
      const result = await pool.query(
        "INSERT INTO videos (date, start_time, end_time, name, video_url, camera_id) VALUES ($1, $2, $3, $4, $5, $6);",
        [date, start_time, end_time, name, video_url, camera_id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async udpate({
    name,
    camera_id,
    date,
    start_time,
    end_time,
    video_id,
  }) {
    try {
      const result = await pool.query(
        "UPDATE videos SET name = $1, camera_id = $2, date = $3, start_time = $4, end_time = $5 WHERE video_id = $6",
        [name, camera_id, date, start_time, end_time, video_id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
