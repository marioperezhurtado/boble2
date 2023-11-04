import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, `/login?redirectTo=${url.pathname + url.search}`);
  }

  return { user: session.user };
}
