import { auth } from '$lib/auth/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  await auth.invalidateSession(locals.session.sessionId);
  locals.auth.setSession(null);

  redirect(302, '/login');
};
