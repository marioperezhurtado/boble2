import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { isParticipant } from "$lib/db/participant/isParticipant";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { createAudioInfo } from "$lib/db/audioInfo/createAudioInfo";
import { protectedProcedure } from "$lib/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const sendAudioSchema = z.object({
  audioId: z.string(),
  duration: z.number(),
  volumeSpikes: z.array(z.number()),
  transcript: z.string().optional(),
  replyToId: z.string().optional(),
  caption: z.string().optional(),
  chatId: z.string(),
});

export const sendAudio = protectedProcedure
  .input(sendAudioSchema)
  .mutation(async ({ ctx, input }) => {
    const [isParticipantInChat, isBlocked] = await Promise.all([
      isParticipant({
        userId: ctx.session.user.id,
        chatId: input.chatId,
      }),
      isBlockedInChat({
        userId: ctx.session.user.id,
        chatId: input.chatId,
      }),
    ]);

    if (!isParticipantInChat) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not a participant in this chat",
      });
    }

    if (isBlocked) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are blocked in this chat",
      });
    }

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.session.user.id,
      replyToId: input.replyToId,
      text: input.caption,
      source: input.audioId,
      type: "audio",
    });

    const audioInfo = await createAudioInfo({
      url: input.audioId,
      duration: input.duration,
      transcript: input.transcript,
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
