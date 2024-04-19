import { generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { PasswordResetModel } from "../models/password_reset.js";
import nodemailer from 'nodemailer'

export const convertirFormatoFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const mesFormateado = mes < 10 ? `0${mes}` : mes;

  const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;

  return fechaFormateada;
};

export const getLastDays = () => {
  const today = new Date();
  const dates = [];
  // Iterar para los últimos 7 días, empezando desde hoy
  for (let i = 0; i <= 7; i++) {
    let date = new Date();
    date.setDate(today.getDate() - i);

    // Formatear la fecha (puedes personalizar el formato según tus necesidades)
    const formattedDate =
      ("0" + date.getDate()).slice(-2) +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      date.getFullYear();

    dates.push({ value: formattedDate, text: formattedDate });
  }
  return dates;
};

export async function createPasswordResetToken(userId): Promise<string> {
	await PasswordResetModel.deleteUser({ user_id: userId })
	const tokenId = generateId(40);
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
	await PasswordResetModel.insertToken({ token_hash: tokenHash, user_id: userId, expires_at: createDate(new TimeSpan(2, "h")) }) 
	return tokenId;
}

export async function sendPasswordResetToken(email, verificationLink): Promise<string> {
	const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: import.meta.env.EMAIL,
        pass: import.meta.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: import.meta.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${verificationLink}`,
    };
    const statusEmailSent = transporter.sendMail(mailOptions, (error) => {
      if (error) return 500
      return 200
    });

    return statusEmailSent
}
