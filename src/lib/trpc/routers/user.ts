import { editUser } from "$lib/db/user/editUser";
import { createTRPCRouter, protectedProcedure } from "$lib/trpc/trpc";
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

export const userRouter = createTRPCRouter({
  edit: protectedProcedure
    .input(editUserSchema)
    .mutation(async ({ ctx, input }) => {
      return editUser({
        name: input.name,
        status: input.status,
        id: ctx.session.user.id,
      });
    }),
});
