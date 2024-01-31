import { asc, eq, and } from "drizzle-orm";
import { db } from "$lib/db/db";
import { message, linkPreview, documentInfo, audioInfo, imageInfo, videoInfo } from "$lib/db/schema";

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
      imageInfo,
      videoInfo,
      linkPreview,
      documentInfo,
      audioInfo,
    })
    .from(message)
    .where(eq(message.chatId, chatId))
    .orderBy(asc(message.createdAt))
    // join image info to image messages
    .leftJoin(imageInfo, and(
      eq(message.type, "image"),
      eq(message.id, imageInfo.messageId)
    ))
    // join video info to video messages
    .leftJoin(videoInfo, and(
      eq(message.type, "video"),
      eq(message.id, videoInfo.messageId)
    ))
    // join link preview metadata to link messages
    .leftJoin(linkPreview, and(
      eq(message.type, "link"),
      eq(message.id, linkPreview.messageId)
    ))
    // join document info to document messages
    .leftJoin(documentInfo, and(
      eq(message.type, "document"),
      eq(message.id, documentInfo.messageId)
    ))
    // join audio info to audio messages
    .leftJoin(audioInfo, and(
      eq(message.type, "audio"),
      eq(message.id, audioInfo.messageId)
    ))
}

export type Messages = typeof getMessages extends (...args: any) => Promise<infer T> ? T : never
export type Message = Messages[number]
