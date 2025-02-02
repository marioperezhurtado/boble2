import { protectedProcedure } from "$lib/trpc/server/trpc";
import { editContact as editContactDb } from "$lib/db/contact/editContact";
import { aliasSchema } from "./shared";
import { z } from "zod";

const editContactSchema = z.object({
  contactId: z.string(),
  alias: aliasSchema,
});

export const editContact = protectedProcedure
  .input(editContactSchema)
  .mutation(async ({ ctx, input }) => {
    await editContactDb({
      userId: ctx.user.id,
      contactId: input.contactId,
      newAlias: input.alias,
    });

    return input.contactId;
  });
