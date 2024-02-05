import { createMessage } from "$lib/db/message/createMessage";
import { createVideoInfo } from "$lib/db/videoInfo/createVideoInfo";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { checkCanSendMessage } from "./shared";
import { z } from "zod";

const sendVideoSchema = z.object({
  videoId: z.string(),
  replyToId: z.string().optional(),
  caption: z.string().optional(),
  chatId: z.string(),
  width: z.number(),
  height: z.number(),
  duration: z.number(),
});

export const sendVideo = protectedProcedure
  .input(sendVideoSchema)
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
      source: input.videoId,
      type: "video",
    });

    const videoInfo = await createVideoInfo({
      messageId: newMessage.id,
      width: input.width,
      height: input.height,
      duration: input.duration,
    });

    return {
      ...newMessage,
      videoInfo,
    };
  });
