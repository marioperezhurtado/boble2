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
      session: event.locals.session,
      auth: event.locals.auth,
      ...event
    }
  }
})

export const GET = requestHandler
export const POST = requestHandler
