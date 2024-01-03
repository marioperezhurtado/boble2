import { auth } from "$lib/auth/auth";
import { validateEmailVerificationToken } from "$lib/db/emailVerificationToken/validateEmailVerificationToken";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, locals }) => {
  const { token } = params;
  try {
    const userId = await validateEmailVerificationToken(token);
    const user = await auth.getUser(userId);
    await auth.invalidateAllUserSessions(user.userId);
    await auth.updateUserAttributes(user.userId, {
      emailVerified: Number(true),
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    locals.auth.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch {
    return new Response("Invalid email verification link", {
      status: 400,
    });
  }
};
