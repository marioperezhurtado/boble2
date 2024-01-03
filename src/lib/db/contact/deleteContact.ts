import { and, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { contact } from "$lib/db/schema";

type DeleteContactParams = {
  userId: string;
  contactId: string;
};

export function deleteContact({ userId, contactId }: DeleteContactParams) {
  return db
    .delete(contact)
    .where(and(eq(contact.userId, userId), eq(contact.contactId, contactId)));
}
