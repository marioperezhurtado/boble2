import { redirect } from '@sveltejs/kit';
import { getMessages } from '$lib/db/message/getMessages';
import { readChat } from '$lib/db/chat/readChat';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { chats, user } = await parent();

  const chat = chats.find((chat) => chat.id === params.chatId);
  if (!chat) {
    redirect(302, '/');
  }

  await readChat(params.chatId, user.id);

  const messages = await getMessages(params.chatId);

  return {
    chat,
    messages,
  };
}
