import { fail, redirect } from '@sveltejs/kit';
import { getMessages } from '$lib/db/message/getMessages';
import { createMessage } from '$lib/db/message/createMessage';
import { readChat } from '$lib/db/chat/readChat';
import { sendMessage } from '$lib/utils/chat';
import { getSessionRequired } from '$lib/auth/auth';
import { deleteChat } from '$lib/db/chat/deleteChat';
import { getChats } from '$lib/db/chat/getChats';
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
  };
}

export const actions = {
  sendMessage: async ({ request, params, locals }) => {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const message = formData.get('message') as string;
    if (!message) {
      return fail(400, { message, missing: true });
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
      return fail(400, { message: 'Chat not found' });
    }

    await deleteChat(params.chatId);

    throw redirect(302, '/chat');
  }
} satisfies Actions;
