import { createLinkPreview } from "$lib/db/linkPreview/createLinkPreview";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { protectedProcedure } from "$lib/trpc/trpc";
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
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.session.user.id,
      replyToId: input.replyToId,
      text: input.text,
      source: input.url,
      type: "link",
    });

    // Send message without link preview if not provided
    if (!input.linkPreview) {
      sendMessage({
        ...newMessage,
        linkPreview: null,
        documentInfo: null,
        audioInfo: null
      });
      return;
    }

    await createLinkPreview({
      ...input.linkPreview,
      messageId: newMessage.id,
    });

    // Send message with link preview
    sendMessage({
      ...newMessage,
      linkPreview: {
        ...input.linkPreview,
        messageId: newMessage.id
      },
      documentInfo: null,
      audioInfo: null
    });

  });
