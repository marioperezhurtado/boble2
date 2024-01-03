import { redirect } from "@sveltejs/kit";
import { getMessages } from "$lib/db/message/getMessages";
import { readChat } from "$lib/db/chat/readChat";
import { getTrendingGifs } from "$lib/mood/gif/getTrendingGifs";
import { getTrendingStickers } from "$lib/mood/sticker/getTrendingStickers";
import { sendTextMessage } from "./_actions/sendTextMessage";
import { sendImage } from "./_actions/sendImage";
import { sendVideo } from "./_actions/sendVideo";
import { sendAudio } from "./_actions/sendAudio";
import { sendDocument } from "./_actions/sendDocument";
import { sendGif } from "./_actions/sendGif";
import { sendSticker } from "./_actions/sendSticker";
import { deleteMessage } from "./_actions/deleteMessage";
import { searchGifs } from "./_actions/searchGifs";
import { searchStickers } from "./_actions/searchStickers";

import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ params, parent }) => {
  const { user, chats } = await parent();

  const chat = chats.find((chat) => chat.id === params.chatId);
  if (!chat) {
    redirect(302, "/");
  }

  await readChat(params.chatId, user.id);

  const messages = await getMessages(params.chatId);

  return {
    chat,
    messages,
    trendingGifs: getTrendingGifs(),
    trendingStickers: getTrendingStickers(),
  };
};

export const actions = {
  sendTextMessage,
  sendImage,
  sendVideo,
  sendAudio,
  sendDocument,
  sendGif,
  sendSticker,
  deleteMessage,
  searchGifs,
  searchStickers,
} satisfies Actions;
