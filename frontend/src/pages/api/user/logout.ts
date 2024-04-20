import { lucia } from "../../../auth.ts";
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
	if (!context.locals.session) {
		return new Response(JSON.stringify({message:"Credenciales incorrectas"}), {
			status: 401
		});
	}

	await lucia.invalidateSession(context.locals.session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return new Response(JSON.stringify({message: 'Sesion cerrada con exito'}), {
		status: 200,
		headers: {
            Location: "/",
            "Set-Cookie": sessionCookie.serialize(),
            "Referrer-Policy": "no-referrer"
        }
	})
}