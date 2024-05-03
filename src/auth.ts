// src/auth.ts
import { Lucia } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { pool } from "./models/db.js";

const adapter = new NodePostgresAdapter(pool, {
	user: "users",
	session: "user_session"
});


export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD
		}
	},
    getUserAttributes: (attributes) => {
		return {
            user_id: attributes.user_id,
            establishment_id: attributes.establishment_id
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}