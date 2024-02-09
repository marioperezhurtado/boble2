import { generatePasswordResetToken } from "$lib/db/passwordResetToken/generatePasswordResetToken";
import { getUserByEmail } from "$lib/db/user/getUserByEmail";
import { sendPasswordResetLink } from "$lib/email/sendPasswordResetLink";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { rateLimitStrictest } from "$lib/trpc/server/middleware";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const startPasswordResetSchema = z.object({
  email: z.string().email()
});

export const startPasswordReset = publicProcedure
  .use(rateLimitStrictest)
  .input(startPasswordResetSchema)
  .mutation(async ({ input }) => {
    const storedUser = await getUserByEmail(input.email);

    if (!storedUser || !storedUser.emailVerified) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User does not exist"
      });
    }

    const token = await generatePasswordResetToken(storedUser.id);

    await sendPasswordResetLink({
      name: storedUser.name,
      email: storedUser.email,
      token
    });
  });
