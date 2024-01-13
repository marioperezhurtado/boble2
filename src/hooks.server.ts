import { createTRPCContext } from "$lib/trpc/trpc";
import { createTRPCHandle } from "trpc-sveltekit";
import { router } from "$lib/trpc/root";
import { auth } from "$lib/auth/auth";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);
  event.locals.session = await event.locals.auth.validate();

  if (event.url.pathname.startsWith("/chat")) {
    if (!event.locals.session) {
      redirect(302, "/login");
    }
    if (!event.locals.session.user.emailVerified) {
      redirect(302, "/email-verification");
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

