import { removeMessage } from "$lib/socket/client";
import { deleteMessage as deleteMessageDb } from "$lib/db/message/deleteMessage";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { deleteFile } from "$lib/file-upload/deleteFile";
import { getMessageById } from "$lib/db/message/getMessageById";
import { MEDIA_TYPES } from "$lib/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const deleteMessageSchema = z.object({
  messageId: z.string(),
});

export const deleteMessage = protectedProcedure
  .input(deleteMessageSchema)
  .mutation(async ({ ctx, input }) => {
    const message = await getMessageById(input.messageId);

    if (!message) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Message not found",
      });
    }

    if (message.senderId !== ctx.session.user.id) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "This message is not yours",
      });
    }

    await deleteMessageDb(input.messageId);
    removeMessage(input.messageId, message.chatId);

    const isMedia = MEDIA_TYPES.includes(message.type);

    // Delete file from s3 bucket
    if (isMedia && message.source) {
      await deleteFile(message.source);
    }
  });
