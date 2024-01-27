import { auth } from "$lib/auth/auth";
import { generateEmailVerificationToken } from "$lib/db/emailVerificationToken/generateEmailVerificationToken";
import { sendEmailVerificationLink } from "$lib/email/sendEmailVerificationLink";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import { SqliteError } from "better-sqlite3";
import { nanoid } from "nanoid";
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

    try {
      const user = await auth.createUser({
        userId: `u_${nanoid(8)}`,
        key: {
          providerId: 'email',
          // Unique id when using "email" auth method
          providerUserId: input.email.toLowerCase(),
          // Hashed password by Lucia
          password: input.password
        },
        attributes: {
          name: input.name,
          email: input.email.toLowerCase(),
          emailVerified: Number(false),
          image: null,
          status: null,
          publicKey: input.publicKey,
          encryptedSecret: input.encryptedSecret
        }
      });
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });

      // Set session cookie
      ctx.locals.auth.setSession(session);

      const token = await generateEmailVerificationToken(user.userId);

      await sendEmailVerificationLink({
        name: input.name,
        email: input.email,
        token
      });
    } catch (e) {
      // Check for unique constraint error in user table
      if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This email is already in use'
        });
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong'
      });
    }
  });
