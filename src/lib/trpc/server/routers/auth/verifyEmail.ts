import { isValidEmailVerificationCode } from "$lib/db/emailVerificationCode/isValidEmailVerificationCode";
import { verifyUser } from "$lib/db/user/verifyUser";
import { auth } from "$lib/auth/auth";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const verifyEmailSchema = z.object({
  code: z.string(),
});

export const verifyEmail = publicProcedure
  .input(verifyEmailSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to verify your email",
      });
    }
    if (ctx.user.emailVerified) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Your email is already verified",
      });
    }

    const validCode = await isValidEmailVerificationCode({
      userId: ctx.user.id, 
      code: input.code 
    });
    if (!validCode) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email verification code",
      });
    }

    await auth.invalidateUserSessions(ctx.user.id);
    await verifyUser(ctx.user.id);

    const session = await auth.createSession(ctx.user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
        'Set-Cookie': sessionCookie.serialize(),
      }
    });
  });
