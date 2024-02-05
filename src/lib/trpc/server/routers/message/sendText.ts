import { createMessage } from "$lib/db/message/createMessage";
import { protectedProcedure } from "$lib/trpc/server/trpc";
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
      userId: ctx.user.id,
      chatId: input.chatId,
    });

    return await createMessage({
      chatId: input.chatId,
      senderId: ctx.user.id,
      replyToId: input.replyToId,
      text: input.text,
      type: "text",
    });
  });
