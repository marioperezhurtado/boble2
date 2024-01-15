import { createTRPCContext } from "$lib/trpc/trpc";
import { createTRPCHandle } from "trpc-sveltekit";
import { router } from "$lib/trpc/root";
import { auth } from "$lib/auth/auth";
import { redirect, type Handle } from "@sveltejs/kit";

const APP_ROUTES = [
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

function pathRequiresAuth(path: string) {
  if (path === "/") {
    return true;
  }
  return APP_ROUTES.some(route => path.startsWith(route));
}

function pathRequiresNoAuth(path: string) {
  return AUTH_ROUTES.some(route => path.startsWith(route));
}

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  event.locals.session = await event.locals.auth.validate();

  const session = event.locals.session;

  if (pathRequiresAuth(event.url.pathname)) {
    if (!session) {
      redirect(302, "/login");
    }
    if (!session.user.emailVerified) {
      redirect(302, "/email-verification");
    }
  }

  if (pathRequiresNoAuth(event.url.pathname)) {
    if (session) {
      // If user is not verified, redirect to email verification page
      if (!session.user.emailVerified && event.url.pathname !== "/email-verification") {
        redirect(302, "/email-verification");
      }

      // If user is already verified, redirect to home page
      if (session.user.emailVerified) {
        redirect(302, "/");
      }
    }
  }

  return createTRPCHandle({
    router: router,
    createContext: createTRPCContext,
    onError: ({ type, path, error }) => {
      console.error(`Encountered error while trying to process ${type} @ ${path}`)
      console.error(error)
    }
  })({ event, resolve });
};

