import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();

  if (session) {
    // If user is not verified, redirect to email verification page
    // Do not if user is already there
    if (!session.user.emailVerified && url.pathname !== "/email-verification") {
      throw redirect(302, "/email-verification");
    }

    // If user is verified, redirect to home page
    if (session.user.emailVerified) {
      throw redirect(302, "/");
    }
  }

  return {};
};
