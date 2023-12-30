import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { generateLinkPreview } from "$lib/db/linkPreview/generateLinkPreview";
import { getLinkPreview } from "$lib/db/linkPreview/getLinkPreview";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { isValidUrl } from "$lib/utils/url";
import { diffInDays } from "$lib/utils/date";
import type { RequestEvent } from "../$types";

function isLinkPreviewStale(createdAt: Date) {
  return diffInDays(createdAt, new Date()) > 1;
}

export async function sendTextMessage({ request, params, locals }: RequestEvent) {
  const session = await getSessionRequired(locals.auth);
  const formData = await request.formData();

  const message = formData.get('message') as string;
  if (!message) {
    return fail(400, { error: 'Message is required' });
  }

  const blocked = await isBlockedInChat({
    userId: session.user.id,
    chatId: params.chatId,
  });
  if (blocked) {
    return fail(400, { error: "You can't send messages in this chat" });
  }

  const replyToId = formData.get('replyToId') as string | null;

  // Text message
  if (!isValidUrl(message)) {
    const newMessage = await createMessage({
      chatId: params.chatId,
      senderId: session.user.id,
      replyToId: replyToId ?? null,
      text: message,
      type: "text",
    });

    sendMessage({ ...newMessage, documentInfo: null, linkPreview: null });
    return;
  }

  // Link message
  const url = new URL(message);
  const existingLinkPreview = await getLinkPreview(url);

  const newMessage = await createMessage({
    chatId: params.chatId,
    senderId: session.user.id,
    replyToId: replyToId ?? null,
    text: url.toString(),
    type: "link",
  });

  // If link preview data exists and its not stale, use it
  if (existingLinkPreview && !isLinkPreviewStale(existingLinkPreview.createdAt)) {
    sendMessage({ ...newMessage, documentInfo: null, linkPreview: existingLinkPreview });
    return;
  }

  // Otherwise, generate new link preview data
  try {
    const newLinkPreview = await generateLinkPreview(url);
    sendMessage({ ...newMessage, documentInfo: null, linkPreview: newLinkPreview });
  } catch (e) {
    sendMessage({ ...newMessage, documentInfo: null, linkPreview: null });
  }
}
