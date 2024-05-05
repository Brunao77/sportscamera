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
			secure: import.meta.env.PROD
		}
	},
    getUserAttributes: ({ user_id, establishment_id }) => {
		return {
            id: user_id,
            establishment_id
		};
	}
});