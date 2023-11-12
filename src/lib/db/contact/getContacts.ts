import { eq, desc, and } from "drizzle-orm";
import { db } from "$lib/db/db";
import { block, contact, user } from "$lib/db/schema";
import { alias } from "drizzle-orm/sqlite-core";

export async function getContacts(userId: string) {
  const ownBlock = alias(block, "ownBlock");

  const contacts = await db
    .select({
      id: user.id,
      alias: contact.alias,
      name: user.name,
      email: user.email,
      status: user.status,
      image: user.image,
      isBlocked: block.blockedUserId,
      blockedMe: ownBlock.blockedUserId,
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
    // join if user blocked me
    .leftJoin(ownBlock, and(
      eq(ownBlock.userId, user.id),
      eq(ownBlock.blockedUserId, userId)
    ))
    .orderBy(desc(contact.alias))

  // Hide user info if blocked me
  return contacts.map(contact => {
    if (contact.blockedMe) {
      contact.image = null;
      contact.status = null;
    }
    return contact;
  });
}

export type Contacts = typeof getContacts extends (...args: any) => Promise<infer T> ? T : never
export type Contact = Contacts[number]
