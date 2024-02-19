import { protectedProcedure } from "$lib/trpc/server/trpc";
import { getContacts as getContactsDb } from "$lib/db/contact/getContacts";

export const getContacts = protectedProcedure
  .query(async ({ ctx }) => getContactsDb(ctx.user.id));
