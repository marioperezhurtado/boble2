import { createContact } from "$lib/db/contact/createContact";
import { getContactByEmail } from "$lib/db/contact/getContactByEmail";
import { getUserByEmail } from "$lib/db/user/getUserByEmail";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { aliasSchema } from "./shared";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const addContactSchema = z.object({
  alias: aliasSchema,
  email: z
    .string()
    .email({ message: "Invalid email address" }),
});

export const addContact = protectedProcedure
  .input(addContactSchema)
  .mutation(async ({ ctx, input }) => {
    const existingUser = await getUserByEmail(input.email);

    if (!existingUser) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User not found",
      });
    }

    const existingContact = await getContactByEmail({
      userId: ctx.user.id,
      contactEmail: input.email,
    });

    if (existingContact) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Contact already exists",
      });
    }

    await createContact({
      userId: ctx.user.id,
      contactId: existingUser.id,
      alias: input.alias,
    });

    return existingUser.id;
  });
