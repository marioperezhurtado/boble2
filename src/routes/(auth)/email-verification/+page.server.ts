import { redirect, fail } from "@sveltejs/kit";
import { generateEmailVerificationToken } from "$lib/db/emailVerificationToken/generateEmailVerificationToken";
import { sendEmailVerificationLink } from "$lib/email/sendEmailVerificationLink";

import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) redirect(302, "/login");
  if (session.user.emailVerified) {
    redirect(302, "/");
  }
  return {};
};

export const actions: Actions = {
  default: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) redirect(302, "/login");
    if (session.user.emailVerified) {
      redirect(302, "/");
    }
    try {
      const token = await generateEmailVerificationToken(session.user.userId);
      await sendEmailVerificationLink({
        name: session.user.name,
        email: session.user.email,
        token,
      });

      return { success: true };
    } catch {
      return fail(500, { error: "An unknown error occurred" });
    }
  },
};
