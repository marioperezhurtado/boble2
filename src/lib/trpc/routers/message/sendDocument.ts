import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { isParticipant } from "$lib/db/participant/isParticipant";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { createDocumentInfo } from "$lib/db/documentInfo/createDocumentInfo";
import { protectedProcedure } from "$lib/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const sendDocumentSchema = z.object({
  documentId: z.string(),
  name: z.string(),
  size: z.number(),
  replyToId: z.string().optional(),
  caption: z.string().optional(),
  chatId: z.string(),
});

export const sendDocument = protectedProcedure
  .input(sendDocumentSchema)
  .mutation(async ({ ctx, input }) => {
    const [isParticipantInChat, isBlocked] = await Promise.all([
      isParticipant({
        userId: ctx.session.user.id,
        chatId: input.chatId,
      }),
      isBlockedInChat({
        userId: ctx.session.user.id,
        chatId: input.chatId,
      }),
    ]);

    if (!isParticipantInChat) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not a participant in this chat",
      });
    }

    if (isBlocked) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are blocked in this chat",
      });
    }

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
