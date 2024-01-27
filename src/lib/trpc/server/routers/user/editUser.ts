import { protectedProcedure } from "$lib/trpc/server/trpc";
import { editUser as editUserDb } from "$lib/db/user/editUser";
import { z } from "zod";

const editUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short." })
    .max(50, { message: "Name is too long." }),
  status: z
    .string()
    .min(3, { message: "Status is too short." })
    .max(150, { message: "Status is too long." })
    .nullable(),
});

export const editUser = protectedProcedure
  .input(editUserSchema)
  .mutation(async ({ ctx, input }) => {
    return editUserDb({
      name: input.name,
      status: input.status,
      id: ctx.session.user.id,
    });
  });
