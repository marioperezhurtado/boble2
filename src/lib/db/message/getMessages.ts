import { asc, eq, and } from "drizzle-orm";
import { db } from "$lib/db/db";
import { message, linkPreview, documentInfo, audioInfo } from "$lib/db/schema";

export function getMessages(chatId: string) {
  return db
    .select({
      id: message.id,
      chatId: message.chatId,
      senderId: message.senderId,
      replyToId: message.replyToId,
      text: message.text,
      source: message.source,
      type: message.type,
      createdAt: message.createdAt,
      linkPreview,
      documentInfo,
      audioInfo,
    })
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(asc(message.createdAt))
    // join link preview metadata to link messages
    .leftJoin(linkPreview, and(
      eq(message.type, "link"),
      eq(message.source, linkPreview.url)
    ))
    // join document info to document messages
    .leftJoin(documentInfo, and(
      eq(message.type, "document"),
      eq(message.source, documentInfo.url)
    ))
    // join audio info to audio messages
    .leftJoin(audioInfo, and(
      eq(message.type, "audio"),
      eq(message.source, audioInfo.url)
    ))
}

export type Messages = typeof getMessages extends (...args: any) => Promise<infer T> ? T : never
export type Message = Messages[number]
