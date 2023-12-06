import { db } from "$lib/db/db";
import { message } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export function deleteMessage(messageId: string) {
  return db.delete(message)
    .where(eq(message.id, messageId))
}
