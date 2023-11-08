import { db } from "./db";
import { contact } from "./schema";

type CreateContactParams = {
  userId: string;
  contactId: string;
  alias: string;
};

export function createContact({ userId, contactId, alias }: CreateContactParams) {
  return db
    .insert(contact)
    .values({
      userId,
      contactId,
      alias,
    })
}
