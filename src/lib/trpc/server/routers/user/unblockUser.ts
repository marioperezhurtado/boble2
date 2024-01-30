import { removeBlock } from "$lib/db/block/removeBlock";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { z } from "zod";

const unblockUserSchema = z.object({
  unblockUserId: z.string(),
});

export const unblockUser = protectedProcedure
  .input(unblockUserSchema)
  .mutation(({ ctx, input }) => {
    return removeBlock({
      userId: ctx.user.id,
      unblockUserId: input.unblockUserId,
    });
  });
