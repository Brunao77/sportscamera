import { lucia } from "../../../auth.ts";
import { UserModel } from "../../../models/user.js"
import type { APIContext } from "astro";
import bcrypt from "bcrypt";

export async function POST(context: APIContext): Promise<Response> {
  const { email, password } =  await context.request.json()

	if (!email || !password)
    return new Response(JSON.stringify({message:"Los campos son requeridos"}), {
      status: 400
    });

	const user = await UserModel.findWithEmail({ email });

  if (!user)
    return new Response(JSON.stringify({message:"Credenciales incorrectas"}), {
      status: 401
    });

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword)
    return new Response(JSON.stringify({message:"Credenciales incorrectas"}), {
      status: 401
    });

	const session = await lucia.createSession(user.user_id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/video-list");
}