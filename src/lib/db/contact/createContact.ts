import { db } from "$lib/db/db";
import { contact } from "$lib/db/schema";

type CreateContactParams = {
  userId: string;
  contactId: string;
  alias: string;
};

export function createContact({
  userId,
  contactId,
  alias,
}: CreateContactParams) {
  return db.insert(contact).values({
    userId,
    contactId,
    alias,
    createdAt: new Date(),
  });
}
