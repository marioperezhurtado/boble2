import { and, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { contact } from "$lib/db/schema";

type EditContactParams = {
  userId: string;
  contactId: string;
  newAlias: string;
  newContactId: string;
};

export function editContact({
  userId,
  contactId,
  newAlias,
  newContactId,
}: EditContactParams) {
  return db
    .update(contact)
    .set({
      alias: newAlias,
      contactId: newContactId,
    })
    .where(
      and(
        eq(contact.userId, userId),
        eq(contact.contactId, contactId)
      )
    );
}
