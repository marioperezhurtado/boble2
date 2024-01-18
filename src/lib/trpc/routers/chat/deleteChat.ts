import { protectedProcedure } from "$lib/trpc/trpc";
import { getChatFromUser } from "$lib/db/chat/getChatFromUser";
import { deleteChat as deleteChatDb } from "$lib/db/chat/deleteChat";
import { TRPCError } from "@trpc/server";
import z from "zod";

const deleteChatSchema = z.object({
  chatId: z.string(),
});

export const deleteChat = protectedProcedure
  .input(deleteChatSchema)
  .mutation(async ({ ctx, input }) => {
    const chat = await getChatFromUser({
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    if (!chat) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Chat not found",
      });
    }

    await deleteChatDb(input.chatId);
  });
