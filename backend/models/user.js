import { pool } from "./db.js";

export class UserModel {
  static async findWithEmail({ email }) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  static async signup({ email, password }) {
    try {
      const result = await pool.query(
        "INSERT INTO USERS(email, password) VALUES ($1, $2)",
        [email, password]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async profile({ user_id }) {
    try {
      const { rows } = await pool.query(
        "SELECT email, establishment_id FROM users WHERE user_id = $1",
        [user_id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}
