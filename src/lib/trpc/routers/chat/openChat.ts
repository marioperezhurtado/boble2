import { createChat } from "$lib/db/chat/createChat";
import { getChatByParticipants } from "$lib/db/chat/getChatByParticipants";
import { protectedProcedure } from "$lib/trpc/trpc";
import z from "zod";

const openChatSchema = z.object({
  contactId: z.string(),
});

export const openChat = protectedProcedure
  .input(openChatSchema)
  .mutation(async ({ ctx, input }) => {
    const existingChat = await getChatByParticipants(
      ctx.session.user.id,
      input.contactId
    );

    if (existingChat) {
      return existingChat.id;
    }

    const newChat = await createChat(ctx.session.user.id, input.contactId);
    return newChat.id;
  });
