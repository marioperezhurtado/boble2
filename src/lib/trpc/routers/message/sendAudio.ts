import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { createAudioInfo } from "$lib/db/audioInfo/createAudioInfo";
import { protectedProcedure } from "$lib/trpc/trpc";
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
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.session.user.id,
      replyToId: input.replyToId,
      text: input.transcript,
      source: input.audioId,
      type: "audio",
    });

    const audioInfo = await createAudioInfo({
      url: input.audioId,
      duration: input.duration,
      volumeSpikes: input.volumeSpikes.join(','),
      messageId: newMessage.id,
    });

    sendMessage({
      ...newMessage,
      audioInfo,
      linkPreview: null,
      documentInfo: null,
    });
  });
