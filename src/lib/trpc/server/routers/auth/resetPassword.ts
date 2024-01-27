import { auth } from "$lib/auth/auth";
import { validatePasswordResetToken } from "$lib/db/passwordResetToken/validatePasswordResetToken";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { passwordSchema } from "./shared";
import { TRPCError } from "@trpc/server";
import { LuciaError } from "lucia";
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

    try {
      const userId = await validatePasswordResetToken(input.token);
      let user = await auth.getUser(userId);

      await auth.invalidateAllUserSessions(user.userId);

      await auth.updateKeyPassword(
        'email',
        user.email,
        input.newPassword
      );

      if (!user.emailVerified) {
        user = await auth.updateUserAttributes(user.userId, {
          emailVerified: Number(true)
        });
      }
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });

      // Set session cookie
      ctx.auth.setSession(session);
    } catch (e) {
      if (e instanceof LuciaError && e.message === "AUTH_INVALID_KEY_ID") {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This account did not sign up using a password'
        });
      }
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid or expired password reset link'
      });
    }
  });
