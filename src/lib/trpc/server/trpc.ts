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
 * MIDDLEWARES
 * 
 * You are able to add middleware(s) to a procedure with the `.use()` method.
 * The middleware(s) will wrap the invocation of the procedure and must pass
 * through its return value.
 *
 * @see https://trpc.io/docs/server/middlewares
 */

/**
 * AUTHORIZATION
 *
 * These are middlewares that you can use to enforce authorization on your procedures.
 */
export const enforceIsAuthenticated = t.middleware(async ({ ctx, next }) => {
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
 * RATE LIMITING
 *
 * These are middlewares that you can use to rate limit your procedures.
 */
import { createTRPCStoreLimiter } from "@trpc-limiter/memory";

// When we're testing, we don't want to rate limit ourselves.
// So, we'll increase our rate limit thresholds.

const maxMultiple = process.env.TESTING ? 10_000 : 1;

export const createRateLimiter = (maxRequestsPerMinute: number) =>
  createTRPCStoreLimiter({
    root: t,
    fingerprint: (ctx) => ctx.user?.id ?? ctx.getClientAddress(),
    windowMs: 60_000, // 1 minute
    max: maxRequestsPerMinute * maxMultiple,
    onLimit: () => {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests, please try again later"
      });
    }
  });

export const rateLimitDefault = createRateLimiter(100);

export const rateLimitStrict = createRateLimiter(10);

export const rateLimitStrictest = createRateLimiter(1);

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
export const publicProcedure = t.procedure.use(rateLimitDefault);

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this.  
 * It verifies the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
import { TRPCError } from "@trpc/server";

export const protectedProcedure = publicProcedure.use(enforceIsAuthenticated);
