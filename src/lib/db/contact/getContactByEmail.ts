import { and, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { contact, user } from "$lib/db/schema";

type GetContactByEmailParams = {
  userId: string;
  contactEmail: string;
};

export async function getContactByEmail({ userId, contactEmail }: GetContactByEmailParams) {
  const existingContact = await db
    .select()
    .from(contact)
    .innerJoin(user, eq(contact.contactId, user.id))
    .where(
      and(
        eq(contact.userId, userId),
        eq(user.email, contactEmail)
      )
    )

  return existingContact[0]
}
