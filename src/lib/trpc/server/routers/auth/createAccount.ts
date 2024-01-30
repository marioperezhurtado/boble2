import { auth } from "$lib/auth/auth";
import { generateEmailVerificationToken } from "$lib/db/emailVerificationToken/generateEmailVerificationToken";
import { sendEmailVerificationLink } from "$lib/email/sendEmailVerificationLink";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import { Argon2id } from "oslo/password";
import { createUser } from "$lib/db/user/createUser";
import { passwordSchema } from "./shared";
import { z } from "zod";

const createAccountSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name is too short' })
    .max(255, { message: 'Name is too long' }),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .max(255, { message: 'Email is too long' }),
  password: passwordSchema,
  confirmPassword: z.string(),
  terms: z
    .boolean()
    .refine((v) => v === true, {
      message: 'You must agree to the terms and conditions'
    }),
  publicKey: z.string(),
  encryptedSecret: z.string()
});

export const createAccount = publicProcedure
  .input(createAccountSchema)
  .mutation(async ({ ctx, input }) => {
    if (input.password !== input.confirmPassword) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Passwords do not match'
      });
    }

    const hashedPassword = await new Argon2id().hash(input.password);

    try {
      const user = await createUser({
        ...input,
        email: input.email.toLowerCase(),
        hashedPassword,
      });

      const session = await auth.createSession(user.id, {});

      // Set session cookie
      const sessionCookie = auth.createSessionCookie(session.id);


      ctx.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });

      const token = await generateEmailVerificationToken(user.id);

      await sendEmailVerificationLink({
        name: input.name,
        email: input.email,
        token
      });
    } catch (e) {
      // Db error, email taken, etc
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'This email is already in use'
      });
    }
  });
