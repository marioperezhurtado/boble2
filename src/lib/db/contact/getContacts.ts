import { eq, desc, and } from "drizzle-orm";
import { db } from "$lib/db/db";
import { block, contact, user } from "$lib/db/schema";

export function getContacts(userId: string) {
  return db
    .select({
      id: user.id,
      alias: contact.alias,
      name: user.name,
      email: user.email,
      status: user.status,
      image: user.image,
      isBlocked: block.blockedUserId,
      createdAt: contact.createdAt,
    })
    .from(contact)
    .where(eq(contact.userId, userId))
    // join contact
    .innerJoin(user, eq(contact.contactId, user.id))
    // join if is blocked
    .leftJoin(block, and(
      eq(block.userId, userId),
      eq(block.blockedUserId, contact.contactId),
    ))
    .orderBy(desc(contact.alias))


}

export type Contacts = typeof getContacts extends (...args: any) => Promise<infer T> ? T : never
export type Contact = Contacts[number]
