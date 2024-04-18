import type { APIContext } from "astro";
import { UserModel } from "../../../models/user.js";
import { createPasswordResetToken, sendPasswordResetToken } from "../../../utils/index.js";



export async function POST(context: APIContext): Promise<Response> {
    const { email } =  await context.request.json()
  
    const {user_id} = await UserModel.findWithEmail({ email })
    
    if (!user_id)
		return new Response(JSON.stringify({message: "Email invalido"}), {
            status: 400
        }); 
    
    const verificationToken = await createPasswordResetToken(user_id);
    const verificationLink = import.meta.env.URL "/reset-password/" + verificationToken;

    const statusEmailSent = await sendPasswordResetToken(email, verificationLink);

    if(statusEmailSent === 500) return new Response(JSON.stringify({ message: "Error sending email" }), { status:500 })

    return new Response(JSON.stringify({ message: "Check your email for instructions on resetting your password" }), {
        status: 200
    });
}