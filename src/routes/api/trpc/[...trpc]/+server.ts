import { createTRPCRequestHandler } from "@bevm0/trpc-sveltekit";
import { appRouter } from "$lib/trpc/server/root";
import type { AppRouter } from "$lib/trpc/server/root";
import type { RouteParams, RouteId } from "./$types";

/**
 * Export GET and POST SvelteKit request handlers
 *
 * @see https://trpc.io/docs/api-handler
 * @see https://kit.svelte.dev/docs/routing#server
 */

const requestHandler = createTRPCRequestHandler<AppRouter, RouteParams, RouteId>({
  router: appRouter,
  createContext: ({ event }) => {
    return {
      ...event,
      session: event.locals.session,
      user: event.locals.user,
      cookies: event.cookies,
    }
  }
})

export const GET = requestHandler
export const POST = requestHandler
