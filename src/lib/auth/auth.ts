import { redirect } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { betterSqlite3 } from "@lucia-auth/adapter-sqlite";
import { sqliteDatabase } from "$lib/db/db";
import { github } from "@lucia-auth/oauth/providers"
import { GITHUB_ID, GITHUB_SECRET } from "$env/static/private";
import type { AuthRequest } from "lucia";

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  adapter: betterSqlite3(sqliteDatabase, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),
  getUserAttributes: (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    status: user.status,
    publicKey: user.publicKey,
    encryptedSecret: user.encryptedSecret,
  }),
});

export const githubAuth = github(auth, {
  clientId: GITHUB_ID,
  clientSecret: GITHUB_SECRET,
});

export type Auth = typeof auth;

export async function getSessionRequired(auth: AuthRequest) {
  const session = await auth.validate();
  if (!session) {
    redirect(302, "/login");
  }
  if (!session.user.emailVerified) {
    redirect(302, "/email-verification");
  }
  return session;
}
