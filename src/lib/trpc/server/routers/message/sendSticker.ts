import { checkCanSendMessage } from "./shared";
import { createMessage } from "$lib/db/message/createMessage";
import { protectedProcedure } from "$lib/trpc/server/trpc";
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
      userId: ctx.user.id,
      chatId: input.chatId,
    });

    return await createMessage({
      chatId: input.chatId,
      senderId: ctx.user.id,
      replyToId: input.replyToId,
      text: input.sticker,
      type: "sticker",
    });
  });
