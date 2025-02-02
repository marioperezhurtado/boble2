import { and, desc, eq, gt, ne, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "$lib/db/db";
import { chat, participant, message, user, contact, block, documentInfo, audioInfo } from "$lib/db/schema";

export async function getChats(userId: string) {
  const unreadMessage = alias(message, "unreadMessage");
  const otherParticipant = alias(participant, "otherParticipant");
  const ownBlock = alias(block, "ownBlock");

  const chats = await db
    .select({
      id: chat.id,
      createdAt: chat.createdAt,
      user: {
        id: user.id,
        name: user.name,
        alias: contact.alias,
        image: user.image,
        email: user.email,
        status: user.status,
        joinedAt: otherParticipant.joinedAt,
        lastReadAt: otherParticipant.lastReadAt,
        isBlocked: block.blockedUserId,
        blockedMe: ownBlock.blockedUserId,
        publicKey: user.publicKey,
      },
      lastMessage: {
        id: message.id,
        text: message.text,
        type: message.type,
        createdAt: message.createdAt,
        senderId: message.senderId,
      },
      documentName: documentInfo.name,
      audioDuration: audioInfo.duration,
      unreadCount: sql<number>`cast(count(${unreadMessage.id}) as integer)`,
    })
    .from(chat)
    .innerJoin(participant, eq(participant.chatId, chat.id))
    .where(eq(participant.userId, userId))
    .innerJoin(otherParticipant, and(
      eq(otherParticipant.chatId, chat.id),
      ne(otherParticipant.userId, userId)
    ))
    .innerJoin(user, eq(user.id, otherParticipant.userId))
    .leftJoin(contact, and(
      eq(contact.userId, userId),
      eq(contact.contactId, otherParticipant.userId)
    ))
    .leftJoin(block, and(
      eq(block.userId, userId),
      eq(block.blockedUserId, otherParticipant.userId)
    ))
    .leftJoin(ownBlock, and(
      eq(ownBlock.userId, otherParticipant.userId),
      eq(ownBlock.blockedUserId, userId)
    ))
    .leftJoin(unreadMessage, and(
      eq(unreadMessage.chatId, chat.id),
      ne(unreadMessage.senderId, userId),
      gt(unreadMessage.createdAt, participant.lastReadAt),
    ))
    .leftJoin(message, eq(message.id, db
      .select({ id: message.id })
      .from(message)
      .where(eq(message.chatId, chat.id))
      .orderBy(desc(message.createdAt))
      .limit(1)
    ))
    .leftJoin(documentInfo, and(
      eq(message.type, "document"),
      eq(message.id, documentInfo.messageId)
    ))
    .leftJoin(audioInfo, and(
      eq(message.type, "audio"),
      eq(message.id, documentInfo.messageId)
    ))
    .orderBy(desc(message.createdAt))
    // This fixes some weird postgres error `check_ungrouped_columns_walker`
    .groupBy(chat.id, user.id, contact.alias, documentInfo.name, audioInfo.duration,
      otherParticipant.joinedAt, otherParticipant.lastReadAt, block.blockedUserId, ownBlock.blockedUserId, message.id);

  // Hide user info if blocked
  return chats.map(chat => {
    if (chat.user.blockedMe || chat.user.isBlocked) {
      chat.user.image = null;
      chat.user.status = null;
    }
    return chat;
  });
}

export type Chats = typeof getChats extends (...args: any) => Promise<infer T> ? T : never
export type Chat = Chats[number]
