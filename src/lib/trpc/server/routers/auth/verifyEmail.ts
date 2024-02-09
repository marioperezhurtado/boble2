import { isValidEmailVerificationCode } from "$lib/db/emailVerificationCode/isValidEmailVerificationCode";
import { verifyUser } from "$lib/db/user/verifyUser";
import { auth } from "$lib/auth/auth";
import { emailVerificationProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const verifyEmailSchema = z.object({
  code: z.string(),
});

export const verifyEmail = emailVerificationProcedure
  .input(verifyEmailSchema)
  .mutation(async ({ ctx, input }) => {
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
