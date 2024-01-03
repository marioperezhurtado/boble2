import { db } from "$lib/db/db";
import { chat } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export function deleteChat(chatId: string) {
  return db
    .delete(chat)
    .where(eq(chat.id, chatId))
}
