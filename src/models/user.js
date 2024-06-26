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
  static async signup({ email, password, establishment_id, role, payment }) {
    try {
      const result = await pool.query(
        "INSERT INTO USERS(email, password, establishment_id, role, payment) VALUES ($1, $2, $3, $4, $5)",
        [email, password, establishment_id, role, payment]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  static async profile({ id }) {
    try {
      const { rows } = await pool.query(
        "SELECT email, establishment_id FROM users WHERE id = $1",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  static async updatePassword({ password, id }) {
    try {
      const { rows } = await pool.query(
        "UPDATE users SET password = $1 WHERE id = $2",
        [password, id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  static async getUserFromEstablishment({ establishment_id }) {
    try {
      const { rows } = await pool.query(
        "SELECT email FROM users WHERE establishment_id = $1",
        [establishment_id]
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}
