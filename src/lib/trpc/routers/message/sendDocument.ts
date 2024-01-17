import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { createDocumentInfo } from "$lib/db/documentInfo/createDocumentInfo";
import { protectedProcedure } from "$lib/trpc/trpc";
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
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.session.user.id,
      replyToId: input.replyToId,
      text: input.caption,
      source: input.documentId,
      type: "document",
    });

    const documentInfo = await createDocumentInfo({
      url: input.documentId,
      name: input.name,
      size: input.size,
      messageId: newMessage.id,
    });

    sendMessage({
      ...newMessage,
      documentInfo,
      linkPreview: null,
      audioInfo: null,
    });
  });
