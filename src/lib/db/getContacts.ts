import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import { contact, user } from "./schema";

export function getContacts(userId: string) {
  return db
    .select({
      id: user.id,
      alias: contact.alias,
      name: user.name,
      email: user.email,
      status: user.status,
      image: user.image,
      createdAt: contact.createdAt,
    })
    .from(contact)
    .where(eq(contact.userId, userId))
    .innerJoin(user, eq(contact.contactId, user.id))
    .orderBy(desc(contact.alias));
}

export type Contacts = typeof getContacts extends (...args: any) => Promise<infer T> ? T : never
export type Contact = Contacts[number]
