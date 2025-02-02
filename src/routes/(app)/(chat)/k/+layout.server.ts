import { getChats } from '$lib/db/chat/getChats';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
  const { user } = await parent();
  const chats = await getChats(user.id);

  return { chats };
}
