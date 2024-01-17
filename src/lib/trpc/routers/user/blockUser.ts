import { createBlock } from "$lib/db/block/createBlock";
import { protectedProcedure } from "$lib/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const blockUserSchema = z.object({
  blockUserId: z.string(),
});

export const blockUser = protectedProcedure
  .input(blockUserSchema)
  .mutation(({ ctx, input }) => {
    if (input.blockUserId === ctx.session.user.id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You cannot block yourself",
      });
    }

    return createBlock({
      userId: ctx.session.user.id,
      blockUserId: input.blockUserId,
    });
  });
