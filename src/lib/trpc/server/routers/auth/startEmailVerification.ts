import { generateEmailVerificationToken } from "$lib/db/emailVerificationToken/generateEmailVerificationToken";
import { sendEmailVerificationLink } from "$lib/email/sendEmailVerificationLink";
import { publicProcedure } from "$lib/trpc/server/trpc";

export const startEmailVerification = publicProcedure
  .mutation(async ({ ctx }) => {
    const token = await generateEmailVerificationToken(ctx.session.user.userId);

    await sendEmailVerificationLink({
      name: ctx.session.user.name,
      email: ctx.session.user.email,
      token
    });
  });
