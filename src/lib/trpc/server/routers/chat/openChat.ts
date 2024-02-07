import { createChat } from "$lib/db/chat/createChat";
import { getChatByParticipants } from "$lib/db/chat/getChatByParticipants";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";

const openChatSchema = z.object({
  userId: z.string(),
});

export const openChat = protectedProcedure
  .input(openChatSchema)
  .mutation(async ({ ctx, input }) => {
    if (input.userId === ctx.user.id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You can't open a chat with yourself",
      });
    }

    const existingChat = await getChatByParticipants(
      ctx.user.id,
      input.userId
    );

    if (existingChat) {
      return existingChat.id;
    }

    const newChat = await createChat(ctx.user.id, input.userId);
    return newChat.id;
  });
