import { and, desc, eq, gt, ne, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { db } from "$lib/db/db";
import { chat, participant, message, user, contact, block } from "$lib/db/schema";

export async function getChats(userId: string) {
  const unreadMessage = alias(message, "unreadMessage");
  const otherParticipant = alias(participant, "otherParticipant");

  return db
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
        isBlocked: block.blockedUserId
      },
      lastMessage: {
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        senderId: message.senderId,
      },
      unreadCount: sql<number>`cast(count(${unreadMessage.id}) as integer)`,
    })
    .from(participant)
    .where(eq(participant.userId, userId))
    .orderBy(desc(participant.lastReadAt))
    // join chat
    .innerJoin(chat, eq(chat.id, participant.chatId))
    // join the other user
    .innerJoin(otherParticipant, and(
      eq(otherParticipant.chatId, chat.id),
      ne(otherParticipant.userId, userId)
    ))
    .innerJoin(user, eq(user.id, otherParticipant.userId))
    // join the other user's contact info if exists
    .leftJoin(contact, and(
      eq(contact.userId, userId),
      eq(contact.contactId, otherParticipant.userId)
    ))
    // join if user is blocked
    .leftJoin(block, and(
      eq(block.userId, userId),
      eq(block.blockedUserId, otherParticipant.userId)
    ))
    // join unread messages (message.createdAt > participant.lastReadAt)
    .leftJoin(unreadMessage, and(
      eq(unreadMessage.chatId, chat.id),
      ne(unreadMessage.senderId, userId),
      gt(unreadMessage.createdAt, participant.lastReadAt),
    ))
    .groupBy(chat.id)
    // join the latest message
    .leftJoin(message, eq(message.id, db
      .select({ id: message.id })
      .from(message)
      .where(eq(message.chatId, chat.id))
      .orderBy(desc(message.createdAt))
      .limit(1)
    ))
    // order by latest message
    .orderBy(desc(message.createdAt));
}

export type Chats = typeof getChats extends (...args: any) => Promise<infer T> ? T : never
export type Chat = Chats[number]
