import { auth } from "$lib/auth/auth";
import { redirect, type Handle } from "@sveltejs/kit";
import type { User } from "lucia";

const APP_ROUTES = [
  "/k",
  "/profile",
  "/contacts",
  "/settings",
]

const AUTH_ROUTES = [
  "/login",
  "/create-account",
  "/email-verification",
  "/forgot-password",
]

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(auth.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;

    checkAuth(event.url.pathname, null);

    return resolve(event);
  }

  const { session, user } = await auth.validateSession(sessionId);

  if (session && session.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id);

    // Sveltekit types deviates from the de-facto standard
    // you can use 'as any' too
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie();

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  event.locals.user = user;
  event.locals.session = session;

  checkAuth(event.url.pathname, user);

  return resolve(event);
};

function checkAuth(path: string, user: User | null) {
  if (APP_ROUTES.some(route => path.startsWith(route))) {
    if (!user) {
      redirect(302, "/login");
    }
    if (!user.emailVerified) {
      redirect(302, "/email-verification");
    }
    return;
  }

  if (AUTH_ROUTES.some(route => path.startsWith(route))) {
    if (user) {
      // If user is not verified, redirect to email verification page
      // (except if already on that page)
      if (!user.emailVerified && !path.startsWith("/email-verification")) {
        redirect(302, "/email-verification");
      }

      // If user is already verified, redirect to home page
      if (user.emailVerified) {
        redirect(302, "/");
      }
    }
    return;
  }
}
