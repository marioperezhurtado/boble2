import { auth } from "$lib/auth/auth";
import { fail, redirect } from "@sveltejs/kit";
import { isValidPasswordResetToken } from "$lib/db/passwordResetToken/isValidPasswordResetToken";
import { validatePasswordResetToken } from "$lib/db/passwordResetToken/validatePasswordResetToken";

import type { PageServerLoad, Actions } from "./$types";
import { LuciaError } from "lucia";

export const load: PageServerLoad = async ({ params }) => {
  const { token } = params;
  const validToken = await isValidPasswordResetToken(token);
  if (!validToken) {
    redirect(302, "/forgot-password");
  }
  return {};
};

export const actions: Actions = {
  resetPassword: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 255
    ) {
      return fail(400, { error: "Invalid password" });
    }

    if (password !== confirmPassword) {
      return fail(400, { error: "Passwords do not match" });
    }

    try {
      const { token } = params;
      const userId = await validatePasswordResetToken(token);
      let user = await auth.getUser(userId);

      await auth.invalidateAllUserSessions(user.userId);
      await auth.updateKeyPassword("email", user.email, password);

      if (!user.emailVerified) {
        user = await auth.updateUserAttributes(user.userId, {
          emailVerified: Number(true),
        });
      }
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      locals.auth.setSession(session);
    } catch (e) {
      if (e instanceof LuciaError && e.message === "AUTH_INVALID_KEY_ID") {
        return fail(400, {
          error: "This account did not sign up using a password",
        });
      }
      return fail(400, { error: "Invalid or expired password reset link" });
    }
    redirect(302, "/");
  },
};
