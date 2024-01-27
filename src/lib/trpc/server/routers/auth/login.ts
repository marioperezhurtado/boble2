import { auth } from "$lib/auth/auth";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import { LuciaError } from "lucia";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = publicProcedure
  .input(loginSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      // Find user by key and validate password
      const key = await auth.useKey(
        "email",
        input.email.toLowerCase(),
        input.password
      );
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
      });

      // Set session cookie
      ctx.auth.setSession(session);

      // Return encrypted secret so that the client can decrypt it
      // and store it locally.
      return session.user.encryptedSecret;
    } catch (e) {
      if (
        e instanceof LuciaError &&
        (e.message === "AUTH_INVALID_KEY_ID" || e.message === "AUTH_INVALID_PASSWORD")
      ) {
        // User does not exist or invalid password
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email or password doesn't match",
        });
      }

      // Unknown error
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    }
  });
