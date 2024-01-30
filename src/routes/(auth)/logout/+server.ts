import { auth } from '$lib/auth/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, cookies }) => {
  if (!locals.session) {
    redirect(302, '/login');
  }

  await auth.invalidateSession(locals.session.id);

  const sessionCookie = auth.createBlankSessionCookie();

  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes,
  });

  redirect(302, '/login');
};
