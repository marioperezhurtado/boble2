import { createLinkPreview } from "$lib/db/linkPreview/createLinkPreview";
import { createMessage } from "$lib/db/message/createMessage";
import { protectedProcedure } from "$lib/trpc/server/trpc";
import { checkCanSendMessage } from "./shared";
import z from "zod";

const sendLinkSchema = z.object({
  text: z.string(),
  chatId: z.string(),
  url: z.string(),
  linkPreview: z.object({
    title: z.string().nullable(),
    description: z.string().nullable(),
    image: z.string().nullable(),
    siteName: z.string().nullable(),
  }).optional(),
  replyToId: z.string().optional(),
});

export const sendLink = protectedProcedure
  .input(sendLinkSchema)
  .mutation(async ({ ctx, input }) => {
    await checkCanSendMessage({
      userId: ctx.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.user.id,
      replyToId: input.replyToId,
      text: input.text,
      source: input.url,
      type: "link",
    });

    // Return message without link preview if not provided
    if (!input.linkPreview) {
      return newMessage;
    }

    const linkPreview = await createLinkPreview({
      ...input.linkPreview,
      messageId: newMessage.id,
    });

    return {
      ...newMessage,
      linkPreview,
    };
  });
