import { db } from "$lib/db/db";
import { chat } from "$lib/db/schema";
import { createParticipant } from "../participant/createParticipant";

export async function createChat(user1Id: string, user2Id: string) {
  const newChat = await db
    .insert(chat)
    .values({
      createdAt: new Date(),
    })
    .returning({
      id: chat.id,
    });

  // Create both participants
  await Promise.all([
    createParticipant(newChat[0].id, user1Id),
    createParticipant(newChat[0].id, user2Id),
  ]);

  return newChat[0];
}
