import { auth } from "$lib/auth/auth";
import { validatePasswordResetToken } from "$lib/db/passwordResetToken/validatePasswordResetToken";
import { updateUserPassword } from "$lib/db/user/updateUserPassword";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { passwordSchema } from "./shared";
import { TRPCError } from "@trpc/server";
import { Argon2id } from "oslo/password";
import { z } from "zod";

const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmNewPassword: z.string(),
  token: z.string()
});

export const resetPassword = publicProcedure
  .input(resetPasswordSchema)
  .mutation(async ({ ctx, input }) => {
    if (input.newPassword !== input.confirmNewPassword) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Passwords do not match'
      });
    }

    const userId = await validatePasswordResetToken(input.token);

    await auth.invalidateUserSessions(userId);

    const hashedPassword = await new Argon2id().hash(input.newPassword);

    await updateUserPassword({ userId, hashedPassword });

    // Set session cookie
    const session = await auth.createSession(userId, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    ctx.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  });
