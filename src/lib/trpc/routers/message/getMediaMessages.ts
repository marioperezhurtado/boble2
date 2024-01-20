import { protectedProcedure } from "$lib/trpc/trpc";
import { isParticipantInChat } from "$lib/db/participant/isParticipantInChat";
import { getMediaMessages as getMediaMessagesDb } from "$lib/db/message/getMediaMessages";
import { TRPCError } from "@trpc/server";
import z from "zod";

const getMediaMessagesSchema = z.object({
  chatId: z.string(),
});

export const getMediaMessages = protectedProcedure
  .input(getMediaMessagesSchema)
  .query(async ({ ctx, input }) => {
    const isParticipant = await isParticipantInChat({
      chatId: input.chatId,
      userId: ctx.session.user.id,
    });

    if (!isParticipant) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not a participant in this chat",
      });
    }

    return getMediaMessagesDb(input.chatId);
  });
