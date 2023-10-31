import { db } from "./db";
import { message } from "./schema";

type AddMessageParams = {
  chatId: string;
  senderId: string;
  text: string;
};

export function addMessage({ chatId, senderId, text }: AddMessageParams) {
    return db.insert(message).values({
        chatId,
        senderId,
        text,
        createdAt: new Date(),
    }).returning();
}
