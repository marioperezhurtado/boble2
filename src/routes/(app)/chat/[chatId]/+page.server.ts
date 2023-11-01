import { getMessages } from '$lib/db/getMessages';
import { fail, redirect } from '@sveltejs/kit';
import { addMessage } from '$lib/db/addMessage';
import { readChat } from '$lib/db/readChat';
import { sendMessage } from '$lib/utils/chat';
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
    const session = await locals.auth.validate();
    if (!session) {
      return fail(401, { message: 'Unauthorized' });
    }

    const formData = await request.formData();

    const message = formData.get('message') as string;
    if (!message) {
      return fail(400, { message, missing: true });
    }

    const newMessage = await addMessage({
      chatId: params.chatId,
      text: message,
      senderId: session.user.id,
    });

    sendMessage(newMessage[0]);
  }
} satisfies Actions;
