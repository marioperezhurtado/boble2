import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { createAudioInfo } from "$lib/db/audioInfo/createAudioInfo";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { checkCanSendMessage } from "./shared";
import { z } from "zod";

const sendAudioSchema = z.object({
  audioId: z.string(),
  duration: z.number(),
  volumeSpikes: z.array(z.number()),
  transcript: z.string().nullable().optional(),
  replyToId: z.string().optional(),
  chatId: z.string(),
});

export const sendAudio = protectedProcedure
  .input(sendAudioSchema)
  .mutation(async ({ ctx, input }) => {
    await checkCanSendMessage({
      userId: ctx.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.user.id,
      replyToId: input.replyToId,
      text: input.transcript,
      source: input.audioId,
      type: "audio",
    });

    const audioInfo = await createAudioInfo({
      messageId: newMessage.id,
      duration: input.duration,
      volumeSpikes: input.volumeSpikes.join(','),
    });

    sendMessage({
      ...newMessage,
      audioInfo,
      imageInfo: null,
      videoInfo: null,
      linkPreview: null,
      documentInfo: null,
    });
  });
