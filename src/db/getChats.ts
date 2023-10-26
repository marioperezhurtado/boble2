import { and, desc, eq, ne, or } from "drizzle-orm";
import { db } from "./db";
import { chat, user } from "./schema";

export async function getChats(userId: string) {
  return db
    .select({
      id: chat.id,
      createdAt: chat.createdAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image
      },
    })
    .from(chat)
    // where the user participates
    .where(or(
      eq(chat.user1Id, userId),
      eq(chat.user2Id, userId)
    ))
    // join the other user
    .innerJoin(user, and(
      or(
        eq(user.id, chat.user1Id),
        eq(user.id, chat.user2Id)
      ),
      ne(user.id, userId)
    ))
    // order by latest message
    .orderBy(desc(chat.createdAt));
}

export type Chats = typeof getChats extends (...args: any) => Promise<infer T> ? T : never
