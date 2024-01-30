import type { RequestEvent } from "@sveltejs/kit";

/**
 * CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access thing when processing a request, like the database,
 * the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and
 * client wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */

export async function createTRPCContext(event: RequestEvent){
  return  {
    session: event.locals.session,
    user: event.locals.user,
    ...event,
  }
}
