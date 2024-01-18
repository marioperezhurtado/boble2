import { checkCanSendMessage } from "./shared";
import { sendMessage } from "$lib/socket/client";
import { createMessage } from "$lib/db/message/createMessage";
import { protectedProcedure } from "$lib/trpc/trpc";
import { z } from "zod";

const sendStickerSchema = z.object({
  sticker: z.string(),
  chatId: z.string(),
  replyToId: z.string().optional(),
});

export const sendSticker = protectedProcedure
  .input(sendStickerSchema)
  .mutation(async ({ ctx, input }) => {
    await checkCanSendMessage({
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.session.user.id,
      replyToId: input.replyToId,
      text: input.sticker,
      type: "sticker",
    });
    sendMessage({
      ...newMessage,
      linkPreview: null,
      documentInfo: null,
      audioInfo: null
    });
  });
