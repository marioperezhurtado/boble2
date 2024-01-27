import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { checkCanSendMessage } from "./shared";
import { z } from "zod";

const sendGifSchema = z.object({
  gif: z.string(),
  chatId: z.string(),
  replyToId: z.string().optional(),
});

export const sendGif = protectedProcedure
  .input(sendGifSchema)
  .mutation(async ({ ctx, input }) => {
    await checkCanSendMessage({
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.session.user.id,
      replyToId: input.replyToId,
      text: input.gif,
      type: "gif",
    });

    sendMessage({
      ...newMessage,
      linkPreview: null,
      documentInfo: null,
      audioInfo: null
    });
  });
