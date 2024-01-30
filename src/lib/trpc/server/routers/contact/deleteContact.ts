import { protectedProcedure } from "$lib/trpc/server/trpc";
import { deleteContact as deleteContactDb } from "$lib/db/contact/deleteContact";
import { z } from "zod";

const deleteContactSchema = z.object({
  contactId: z.string(),
});

export const deleteContact = protectedProcedure
  .input(deleteContactSchema)
  .mutation(async ({ ctx, input }) => {
    await deleteContactDb({
      userId: ctx.user.id,
      contactId: input.contactId,
    });
  });
