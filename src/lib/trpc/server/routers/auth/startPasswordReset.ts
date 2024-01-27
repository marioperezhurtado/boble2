import { generatePasswordResetToken } from "$lib/db/passwordResetToken/generatePasswordResetToken";
import { getUserByEmail } from "$lib/db/user/getUserByEmail";
import { sendPasswordResetLink } from "$lib/email/sendPasswordResetLink";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import { auth } from "$lib/auth/auth";
import { z } from "zod";

const startPasswordResetSchema = z.object({
  email: z.string().email()
});

export const startPasswordReset = publicProcedure
  .input(startPasswordResetSchema)
  .mutation(async ({ input }) => {
    const storedUser = await getUserByEmail(input.email);

    if (!storedUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User does not exist"
      });
    }

    const user = auth.transformDatabaseUser({
      ...storedUser,
      emailVerified: Number(storedUser.emailVerified)
    });

    const token = await generatePasswordResetToken(user.userId);

    await sendPasswordResetLink({
      name: user.name,
      email: user.email,
      token
    });
  });
