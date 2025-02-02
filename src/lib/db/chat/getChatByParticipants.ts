import { and, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { chat, participant } from "$lib/db/schema";
import { alias } from "drizzle-orm/pg-core";

export async function getChatByParticipants(user1Id: string, user2Id: string) {
  const participant2 = alias(participant, 'participant2');

  const existingChat = await db
    .select({
      id: chat.id,
    })
    .from(chat)
    .innerJoin(participant, eq(participant.chatId, chat.id))
    .innerJoin(participant2, eq(participant2.chatId, chat.id))
    .where(
      and(
        eq(participant.userId, user1Id),
        eq(participant2.userId, user2Id)
      )
    )

  return existingChat[0];
}
