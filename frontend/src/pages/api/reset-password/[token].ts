import type { APIContext } from "astro";
import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { PasswordResetModel } from "../../../models/password_reset.js";
import { lucia } from "../../../auth.ts";
import bcrypt from "bcrypt";
import { UserModel } from "../../../models/user.js";

export async function POST(context: APIContext): Promise<Response> {
    const { token: verificationToken } = context.params;
    const { password } =  await context.request.json()

    if(!password)
        return new Response(JSON.stringify({message:"Los campos son requeridos"}), {
            status: 400
        });

    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(verificationToken)));
    const token = await PasswordResetModel.findTokenHash({ token_hash: tokenHash})

    if(token){
        await PasswordResetModel.deleteTokenHash({ token_hash: tokenHash })
    }

    if (!token || !isWithinExpirationDate(token.expires_at))
		return new Response(JSON.stringify({message:"Token invalido"}), {
			status: 401
		})

    await lucia.invalidateUserSessions(token.user_id);
    const hashedPassword = await bcrypt.hash(password, 12);
    await UserModel.updatePassword({ password: hashedPassword, user_id: token.user_id })

    const session = await lucia.createSession(token.user_id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return new Response(JSON.stringify({message:"Contraseña reestablecida con exito"}), {
        status: 200,
        headers: {
            Location: "/",
            "Set-Cookie": sessionCookie.serialize(),
            "Referrer-Policy": "no-referrer"
        }
    });
}