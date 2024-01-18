import { generateLinkPreview } from "$lib/db/linkPreview/generateLinkPreview";
import { getLinkPreview } from "$lib/db/linkPreview/getLinkPreview";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { protectedProcedure } from "$lib/trpc/trpc";
import { diffInDays } from "$lib/utils/date";
import { checkCanSendMessage } from "./shared";
import z from "zod";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function isLinkPreviewStale(createdAt: Date) {
  return diffInDays(createdAt, new Date()) > 1;
}

const sendTextSchema = z.object({
  text: z.string(),
  chatId: z.string(),
  replyToId: z.string().optional(),
});

export const sendText = protectedProcedure
  .input(sendTextSchema)
  .mutation(async ({ ctx, input }) => {
    await checkCanSendMessage({
      userId: ctx.session.user.id,
      chatId: input.chatId,
    });

    const linkMatches = input.text.match(URL_REGEX);

    // Text message
    if (!linkMatches?.length) {
      const newMessage = await createMessage({
        chatId: input.chatId,
        senderId: ctx.session.user.id,
        replyToId: input.replyToId,
        text: input.text,
        type: "text",
      });

      sendMessage({
        ...newMessage,
        documentInfo: null,
        linkPreview: null,
        audioInfo: null
      });
      return;
    }

    // Link message
    const url = new URL(linkMatches![0]);
    const existingLinkPreview = await getLinkPreview(url);

    const newMessage = await createMessage({
      chatId: input.chatId,
      senderId: ctx.session.user.id,
      replyToId: input.replyToId,
      text: input.text,
      source: url.toString(),
      type: "link",
    });

    // If link preview data exists and its not stale, use it
    if (existingLinkPreview && !isLinkPreviewStale(existingLinkPreview.createdAt)) {
      sendMessage({
        ...newMessage,
        linkPreview: existingLinkPreview,
        documentInfo: null,
        audioInfo: null
      });
      return;
    }

    // Otherwise, generate new link preview data
    try {
      const newLinkPreview = await generateLinkPreview(url);
      sendMessage({
        ...newMessage,
        linkPreview: newLinkPreview,
        documentInfo: null,
        audioInfo: null
      });
    } catch (e) {
      // Send the message without link preview if it fails
      sendMessage({
        ...newMessage,
        documentInfo: null,
        linkPreview: null,
        audioInfo: null
      });
    }
  });
