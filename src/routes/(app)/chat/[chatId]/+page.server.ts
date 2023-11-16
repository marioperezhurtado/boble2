import { fail, redirect } from '@sveltejs/kit';
import { getMessages } from '$lib/db/message/getMessages';
import { createMessage } from '$lib/db/message/createMessage';
import { readChat } from '$lib/db/chat/readChat';
import { sendMessage } from '$lib/utils/chat';
import { getSessionRequired } from '$lib/auth/auth';
import { deleteChat } from '$lib/db/chat/deleteChat';
import { getChats } from '$lib/db/chat/getChats';
import { isBlockedInChat } from '$lib/db/block/isBlockedInChat';
import { getTrendingGifs } from '$lib/gif/getTrendingGifs';
import { searchGifs } from '$lib/gif/searchGifs';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { user, chats } = await parent();

  const chat = chats.find((chat) => chat.id === params.chatId);
  if (!chat) {
    throw redirect(302, '/chat');
  }

  await readChat(params.chatId, user.id);

  const messages = await getMessages(params.chatId);

  return {
    chat,
    messages,
    streamed: {
      trendingGifs: getTrendingGifs(),
    },
  };
}

export const actions = {
  sendMessage: async ({ request, params, locals }) => {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const message = formData.get('message') as string;
    if (!message) {
      return fail(400, { error: 'Message is required' });
    }

    const blocked = await isBlockedInChat({
      userId: session.user.id,
      chatId: params.chatId,
    });

    if (blocked) {
      return fail(400, { error: "You can't send messages in this chat" });
    }

    const newMessage = await createMessage({
      chatId: params.chatId,
      text: message,
      senderId: session.user.id,
    });

    sendMessage(newMessage[0]);
  },
  deleteChat: async ({ params, locals }) => {
    const session = await getSessionRequired(locals.auth);

    const chats = await getChats(session.user.id);
    const chat = chats.find((chat) => chat.id === params.chatId);
    if (!chat) {
      return fail(400, { error: 'Chat not found' });
    }

    await deleteChat(params.chatId);

    throw redirect(302, '/chat');
  },
  searchGifs: async ({ request }) => {
    const formData = await request.formData();
    const query = formData.get('search') as string;

    if (!query) {
      return fail(400, { error: 'Search query is required' });
    }

    const gifResults = await searchGifs(query);

    return { gifResults };
  },
} satisfies Actions;
