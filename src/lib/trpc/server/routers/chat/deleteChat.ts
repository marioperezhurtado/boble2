import { protectedProcedure } from "$lib/trpc/server/trpc";
import { getChatWithMedia } from "$lib/db/chat/getChatWithMedia";
import { deleteChat as deleteChatDb } from "$lib/db/chat/deleteChat";
import { deleteFile } from "$lib/file-upload/deleteFile";
import { TRPCError } from "@trpc/server";
import z from "zod";

const deleteChatSchema = z.object({
  chatId: z.string(),
});

export const deleteChat = protectedProcedure
  .input(deleteChatSchema)
  .mutation(async ({ ctx, input }) => {
    const chat = await getChatWithMedia({
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    if (!chat) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Chat not found",
      });
    }

    return Promise.all([
      deleteChatDb(input.chatId),
      ...chat.messages.map((source) => deleteFile(source!)),
    ]);
  });
