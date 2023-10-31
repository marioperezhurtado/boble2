import { getMessages } from '$lib/db/getMessages';
import { fail } from '@sveltejs/kit';
import { addMessage } from '$lib/db/addMessage';
import { readChat } from '$lib/db/readChat';
import { sendMessage } from '$lib/utils/chat';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { user } = await parent();

  await readChat(params.chatId, user.id);

  const messages = await getMessages(params.chatId);

  return {
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
