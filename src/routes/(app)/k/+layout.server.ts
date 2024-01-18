import { getChats } from '$lib/db/chat/getChats';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const chats = await getChats(locals.session?.user.id);

  return { chats };
}
