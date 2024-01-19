import { and, eq, inArray } from "drizzle-orm";
import { db } from "$lib/db/db";
import { chat, message, participant } from "$lib/db/schema";

type GetChatWithMedia = {
  userId: string;
  chatId: string;
};

export async function getChatWithMedia({ userId, chatId }: GetChatWithMedia) {
  const result = await db
    .select({
      id: chat.id,
      messageSource: message.source,
    })
    .from(chat)
    .innerJoin(participant, eq(participant.chatId, chat.id))
    .where(
      and(
        eq(participant.userId, userId),
        eq(chat.id, chatId),
      )
    )
    .leftJoin(message, and(
      eq(message.chatId, chat.id),
      inArray(message.type, ["image", "video", "audio", "document"]),
    ))

  return {
    id: result[0].id,
    messages: result.map((r) => r.messageSource).filter((s) => s !== null),
  };
}
