import { and, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { chat, participant } from "$lib/db/schema";

type GetChatFromUser = {
  userId: string;
  chatId: string;
};

export async function getChatFromUser({ userId, chatId }: GetChatFromUser) {
  return db
    .select({
      id: chat.id,
    })
    .from(chat)
    .innerJoin(participant, eq(participant.chatId, chat.id))
    .where(
      and(
        eq(participant.userId, userId),
        eq(chat.id, chatId),
      )
    )
    .limit(1)
    .get();

}
