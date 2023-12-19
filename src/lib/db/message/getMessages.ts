import { asc, eq, and } from "drizzle-orm";
import { db } from "$lib/db/db";
import { message, linkPreview } from "$lib/db/schema";

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
      linkPreview: {
        url: linkPreview.url,
        title: linkPreview.title,
        description: linkPreview.description,
        image: linkPreview.image,
        siteName: linkPreview.siteName,
      }
    })
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(asc(message.createdAt))
    // join link preview metadata to link messages
    .leftJoin(linkPreview, and(
      eq(message.type, "link"), 
      eq(message.text, linkPreview.url)
    ))
}

export type Messages = typeof getMessages extends (...args: any) => Promise<infer T> ? T : never
export type Message = Messages[number]
