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
 * RATE LIMITING
 *
 * These are middlewares that you can use to rate limit your procedures.
 */
import { createTRPCStoreLimiter } from "@trpc-limiter/memory";
import { t } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";

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
