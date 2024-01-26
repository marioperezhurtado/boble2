import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { protectedProcedure } from "$lib/trpc/trpc";
import { checkCanSendMessage } from "./shared";
import z from "zod";

const sendTextSchema = z.object({
  text: z.string(),
  chatId: z.string(),
  replyToId: z.string().optional(),
});

export const sendText = protectedProcedure
  .input(sendTextSchema)
  .mutation(async ({ ctx, input }) => {
    await checkCanSendMessage({
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.session.user.id,
      replyToId: input.replyToId,
      text: input.text,
      type: "text",
    });

    sendMessage({
      ...newMessage,
      documentInfo: null,
      linkPreview: null,
      audioInfo: null
    });
  });
