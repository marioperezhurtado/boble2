import { fail } from '@sveltejs/kit';
import { getSessionRequired } from '$lib/auth/auth';
import { deleteChat } from '$lib/db/chat/deleteChat';
import { getChats } from '$lib/db/chat/getChats';
import type { Actions } from './$types';

export const actions = {
  deleteChat: async ({ request, locals }) => {
    const session = await getSessionRequired(locals.auth);

    const formData = await request.formData();
    const chatId = formData.get('chatId') as string;
    if (!chatId) {
      return fail(400, { error: 'Chat id not found' });
    }

    const chats = await getChats(session.user.id);
    const chat = chats.find((chat) => chat.id === chatId);
    if (!chat) {
      return fail(400, { error: 'Chat not found' });
    }

    await deleteChat(chatId);
  },
} satisfies Actions;
