import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import type { RequestEvent } from "../$types";

export async function sendGif({ request, params, locals }: RequestEvent) {
  const session = await getSessionRequired(locals.auth);
  const formData = await request.formData();

  const gif = formData.get('gif') as string | null;
  if (!gif) {
    return fail(400, { error: 'GIF is required' });
  }

  const blocked = await isBlockedInChat({
    userId: session.user.id,
    chatId: params.chatId,
  });
  if (blocked) {
    return fail(400, { error: "You can't send messages in this chat" });
  }

  const replyToId = formData.get('replyToId') as string | null;

  const newMessage = await createMessage({
    chatId: params.chatId,
    senderId: session.user.id,
    replyToId: replyToId ?? null,
    text: gif,
    type: "gif",
  });
  sendMessage({ ...newMessage, linkPreview: null, documentInfo: null, audioInfo: null });
}
