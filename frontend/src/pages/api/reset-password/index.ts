import type { APIContext } from "astro";
import { PasswordResetModel } from "../../../models/password_reset.js";
import { UserModel } from "../../../models/user.js";
import { generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

async function createPasswordResetToken(userId): Promise<string> {
	await PasswordResetModel.deleteUser({ user_id: userId })
	const tokenId = generateId(40);
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
	await PasswordResetModel.insertToken({ token_hash: tokenHash, user_id: userId, expires_at: createDate(new TimeSpan(2, "h")) }) 
	return tokenId;
}


export async function POST(context: APIContext): Promise<Response> {
    const { email } =  await context.request.json()
  
    const {user_id} = await UserModel.findWithEmail({ email })
    
    if (!user_id)
		return new Response(JSON.stringify({message: "Email invalido"}), {
            status: 400
        }); 
    
    const verificationToken = await createPasswordResetToken(user_id);
    const verificationLink = import.meta.env.URL "/reset-password/" + verificationToken;

    await sendPasswordResetToken(email, verificationLink);
    return new Response(null, {
        status: 200
    });
    }
}