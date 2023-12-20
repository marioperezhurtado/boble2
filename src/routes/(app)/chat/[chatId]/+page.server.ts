import { redirect } from '@sveltejs/kit';
import { getMessages } from '$lib/db/message/getMessages';
import { readChat } from '$lib/db/chat/readChat';
import { getTrendingGifs } from '$lib/gif/getTrendingGifs';
import { sendTextMessage } from './_actions/sendTextMessage';
import { sendImage } from './_actions/sendImage';
import { sendGif } from './_actions/sendGif';
import { deleteMessage } from './_actions/deleteMessage';
import { searchGifs } from './_actions/searchGifs';
import type { PageServerLoad, Actions } from './$types';


export const load: PageServerLoad = async ({ params, parent }) => {
  const { user, chats } = await parent();

  const chat = chats.find((chat) => chat.id === params.chatId);
  if (!chat) {
    redirect(302, '/chat');
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
  sendTextMessage,
  sendImage,
  sendGif,
  deleteMessage,
  searchGifs,
} satisfies Actions;
