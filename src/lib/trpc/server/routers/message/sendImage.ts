import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { checkCanSendMessage } from "./shared";
import { z } from "zod";

const sendImageSchema = z.object({
  imageId: z.string(),
  replyToId: z.string().optional(),
  caption: z.string().optional(),
  chatId: z.string(),
});

export const sendImage = protectedProcedure
  .input(sendImageSchema)
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
      source: input.imageId,
      type: "image",
    });

    sendMessage({
      ...newMessage,
      linkPreview: null,
      documentInfo: null,
      audioInfo: null,
    });
  });
