import { createImageInfo } from "$lib/db/imageInfo/createImageInfo";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { checkCanSendMessage } from "./shared";
import { z } from "zod";

const sendImageSchema = z.object({
  imageId: z.string(),
  chatId: z.string(),
  width: z.number(),
  height: z.number(),
  replyToId: z.string().optional(),
  caption: z.string().optional(),
});

export const sendImage = protectedProcedure
  .input(sendImageSchema)
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
      source: input.imageId,
      type: "image",
    });

    const imageInfo = await createImageInfo({
      messageId: newMessage.id,
      width: input.width,
      height: input.height,
    });

    sendMessage({
      ...newMessage,
      imageInfo,
      videoInfo: null,
      linkPreview: null,
      documentInfo: null,
      audioInfo: null,
    });
  });
