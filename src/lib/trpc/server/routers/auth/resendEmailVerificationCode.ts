import { generateEmailVerificationCode } from "$lib/db/emailVerificationCode/generateEmailVerificationCode";
import { sendEmailVerificationCode } from "$lib/email/sendEmailVerificationCode";
import { emailVerificationProcedure } from "$lib/trpc/server/trpc";
import { rateLimitStrictest } from "$lib/trpc/server/trpc";

export const resendEmailVerificationCode = emailVerificationProcedure
  .use(rateLimitStrictest)
  .mutation(async ({ ctx }) => {
    const verificationCode = await generateEmailVerificationCode(ctx.user.id);

    await sendEmailVerificationCode({
      name: ctx.user.name,
      email: ctx.user.email,
      code: verificationCode
    });
  });
