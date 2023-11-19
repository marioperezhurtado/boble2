import { asc, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { message } from "$lib/db/schema";

export function getMessages(chatId: string) {
  return db
    .select({
      id: message.id,
      text: message.text,
      type: message.type,
      senderId: message.senderId,
      createdAt: message.createdAt,
      chatId: message.chatId,
    })
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(asc(message.createdAt));
}

export type Messages = typeof getMessages extends (...args: any) => Promise<infer T> ? T : never
export type Message = Messages[number]
