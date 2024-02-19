import { createMessage } from "$lib/db/message/createMessage";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { checkCanSendMessage } from "./shared";
import z from "zod";

const sendContactSchema = z.object({
  alias: z.string(),
  email: z.string(),
  chatId: z.string(),
  replyToId: z.string().optional(),
});

export const sendContact = protectedProcedure
  .input(sendContactSchema)
  .mutation(async ({ ctx, input }) => {
    await checkCanSendMessage({
      userId: ctx.user.id,
      chatId: input.chatId,
    });

    return await createMessage({
      chatId: input.chatId,
      senderId: ctx.user.id,
      replyToId: input.replyToId,
      text: input.alias,
      source: input.email,
      type: "contact",
    });
  });
