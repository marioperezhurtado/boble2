import { db } from "$lib/db/db";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { user, session } from "$lib/db/schema";
import { Lucia } from "lucia";
import { dev } from "$app/environment";

const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev,
    }
  },
  getUserAttributes: (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    status: user.status,
    image: user.image,
    publicKey: user.publicKey,
    encryptedSecret: user.encryptedSecret,
  }),
});

declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    status: string | null;
    image: string | null;
    // Used for end-to-end encryption
    publicKey: string;
    encryptedSecret: string;
  }
