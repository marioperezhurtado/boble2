import { auth } from "$lib/auth/auth";
import { publicProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import { Argon2id } from "oslo/password";
import { getUserByEmail } from "$lib/db/user/getUserByEmail";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = publicProcedure
  .input(loginSchema)
  .mutation(async ({ ctx, input }) => {
      const user = await getUserByEmail(input.email.toLowerCase());

      if (!user) {
        /* NOTE:
         * Returning inmediately allows malicious actors to figure out valid
         * emails from response times, allowing them to only focus on guessing
         * passwords in brute-force attacks.
         *
         * As a preventive measure, you may want to hash passwords even for
         * invalid emails.
         *
         * However, valid emails can be already revealed with the signup page
         * and a similar timing issue can likely be found in password reset
         * implementation. It will also be much more resource intensive.
         * 
         * Since protecting against this is not trivial, it is crucial your
         * implementation is protected against brute-force attacks with login
         * throttling etc.
         *
         * If emails/usernames are public, you may outright tell the user
         * that the username is invalid.
        */
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password",
        });
      }

      const isValidPassword = await new Argon2id().verify(
        user.hashedPassword,
        input.password
      );
      if (!isValidPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email or password",
        });
      }

      // Set session cookie
      const session = await auth.createSession(user.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);

      ctx.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });

      // Return encrypted secret so user can decrypt it and store it locally.
      return user.encryptedSecret;
  });
