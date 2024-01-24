import { asc, eq, and, inArray } from "drizzle-orm";
import { db } from "$lib/db/db";
import { message, linkPreview, documentInfo, audioInfo } from "$lib/db/schema";

export function getMediaMessages(chatId: string) {
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
    .where(
      and(
      eq(message.chatId, chatId),
      inArray(message.type, ["image", "video", "audio", "document", "link"])
      )
    )
    .orderBy(asc(message.createdAt))
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
