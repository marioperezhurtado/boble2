import { redirect } from '@sveltejs/kit';
import { getChats } from '$lib/db/getChats';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();
  if (!session) {
    throw redirect(302, `/login?redirectTo=${url.pathname + url.search}`);
  }

  const chats = await getChats(session.user.id);

  return { chats, user: session.user };
}
