import { getSessionRequired } from '$lib/auth/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await getSessionRequired(locals.auth);

  return { user: session.user };
}
