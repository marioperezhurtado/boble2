import { auth } from '$lib/auth/auth';
import { validateEmailVerificationToken } from '$lib/db/emailVerificationToken/validateEmailVerificationToken';
import { getUserById } from '$lib/db/user/getUserById';
import { verifyUser } from '$lib/db/user/verifyUser';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const { token } = params;

  const userId = await validateEmailVerificationToken(token);

  const user = await getUserById(userId);

  await auth.invalidateUserSessions(user.id);
  await verifyUser(user.id);

  const session = await auth.createSession(user.id, {});
  const sessionCookie = auth.createSessionCookie(session.id);

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
      'Set-Cookie': sessionCookie.serialize(),
    }
  });
};
