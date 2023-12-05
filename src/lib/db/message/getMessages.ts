import { asc, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { message } from "$lib/db/schema";

export function getMessages(chatId: string) {
  return db
    .select({
      id: message.id,
      chatId: message.chatId,
      senderId: message.senderId,
      replyToId: message.replyToId,
      text: message.text,
      type: message.type,
      createdAt: message.createdAt,
    })
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(asc(message.createdAt));
}

export type Messages = typeof getMessages extends (...args: any) => Promise<infer T> ? T : never
export type Message = Messages[number]
