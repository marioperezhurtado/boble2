import { createMessage } from "$lib/db/message/createMessage";
import { createDocumentInfo } from "$lib/db/documentInfo/createDocumentInfo";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { checkCanSendMessage } from "./shared";
import { z } from "zod";

const sendDocumentSchema = z.object({
  documentId: z.string(),
  name: z.string(),
  size: z.number(),
  chatId: z.string(),
  replyToId: z.string().optional(),
  caption: z.string().optional(),
});

export const sendDocument = protectedProcedure
  .input(sendDocumentSchema)
  .mutation(async ({ ctx, input }) => {
    await checkCanSendMessage({
      userId: ctx.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.user.id,
      replyToId: input.replyToId,
      text: input.caption,
      source: input.documentId,
      type: "document",
    });

    const documentInfo = await createDocumentInfo({
      messageId: newMessage.id,
      name: input.name,
      size: input.size,
    });

    return {
      ...newMessage,
      documentInfo,
    };
  });
