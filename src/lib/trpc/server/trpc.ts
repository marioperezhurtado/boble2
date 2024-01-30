import { initTRPC } from "@trpc/server";
import { createTRPCContext } from "$lib/trpc/server/context";
import { ZodError } from "zod";

/**
 * INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. 
 *
 * We also parse ZodErrors so that you get typesafety on the frontend if your procedure
 * fails due to validation errors on the backend.
 */

export const t = initTRPC.context<typeof createTRPCContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        validationErrors:
          error.cause instanceof ZodError ? error.cause.flatten().fieldErrors : null,
        error:
          error.cause instanceof ZodError ? null : error.message,
      },
    };
  },
});

/**
 * ROUTER & PROCEDURE
 *
 * These are the pieces you use to build your tRPC API. 
 * You should import these a lot in the "routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. 
 * It does not guarantee that a user querying is authorized, but you can still access 
 * user session data if they are logged in.
 */
export const publicProcedure = t.procedure;

import { TRPCError } from "@trpc/server";

const enforceIsAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user || !ctx.user?.emailVerified) {
    throw new TRPCError({
      code: "UNAUTHORIZED", message: "You must be logged in to do that"
    });
  }
  return next({
    ctx: {
      ...ctx,
      // infers that `user` and `session` are not nullable to downstream procedures
      user: ctx.user,
      session: ctx.session,
    }
  });
});

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this.  
 * It verifies the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceIsAuthenticated);

import type { inferRouterOutputs, inferRouterInputs } from "@trpc/server";
import type { AppRouter } from "./root";

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */

export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */

export type RouterOutputs = inferRouterOutputs<AppRouter>;
