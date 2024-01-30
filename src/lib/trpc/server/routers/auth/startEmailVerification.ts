import { generateEmailVerificationToken } from "$lib/db/emailVerificationToken/generateEmailVerificationToken";
import { sendEmailVerificationLink } from "$lib/email/sendEmailVerificationLink";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";

export const startEmailVerification = publicProcedure
  .mutation(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to do that"
      });
    }

    const token = await generateEmailVerificationToken(ctx.user.id);

    await sendEmailVerificationLink({
      name: ctx.user.name,
      email: ctx.user.email,
      token
    });
  });
