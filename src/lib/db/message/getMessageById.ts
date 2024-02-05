import { eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { message } from "$lib/db/schema";

export async function getMessageById(messageId: string) {
  const messageResult = await db
    .select({
      id: message.id,
      chatId: message.chatId,
      senderId: message.senderId,
      type: message.type,
      source: message.source,
    })
    .from(message)
    .where(eq(message.id, messageId))
    .limit(1)

  return messageResult[0];
}
