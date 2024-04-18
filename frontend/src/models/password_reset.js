import { pool } from "./db.js";

export class PasswordResetModel {
  static async deleteUser({ user_id }) {
    try {
      const result = await pool.query(
        "DELETE FROM password_reset_token WHERE user_id = $1",
        [user_id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async insertToken({ token_hash, user_id, expires_at }) {
    try {
      const result = await pool.query(
        "INSERT INTO password_reset_token (token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
        [token_hash, user_id, expires_at]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async findTokenHash({ token_hash }) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM password_reset_token WHERE token_hash = $1",
        [token_hash]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteTokenHash({ token_hash }) {
    try {
      const result = await pool.query(
        "DELETE FROM password_reset_token WHERE token_hash = $1",
        [token_hash]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
