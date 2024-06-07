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
    getUserAttributes: ({ id, establishment_id, payment, role }) => {
		return {
            user_id: id,
            establishment_id,
			payment,
			role
		};
	}
});