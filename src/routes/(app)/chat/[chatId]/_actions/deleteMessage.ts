import { fail, redirect } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isParticipant } from "$lib/db/participant/isParticipant";
import { getMessages } from "$lib/db/message/getMessages";
import { removeMessage } from "$lib/socket/client";
import { deleteMessage as deleteMessageDb } from "$lib/db/message/deleteMessage";
import type { RequestEvent } from "../$types";

export async function deleteMessage({ request, params, locals }: RequestEvent) {
  const session = await getSessionRequired(locals.auth);

  const formData = await request.formData();
  const messageId = formData.get('messageId') as string;
  if (!messageId) {
    return fail(400, { error: "Message is required" });
  }

  const participant = await isParticipant({
    userId: session.user.id,
    chatId: params.chatId,
  });
  if (!participant) {
    return fail(401, { error: "You are not a participant in this chat" });
  }

  const messages = await getMessages(params.chatId);
  const message = messages.find((message) => message.id === messageId);
  if (!message) {
    return fail(400, { error: "Message not found" });
  }

  if (message.senderId !== session.user.id) {
    return fail(401, { error: "You cannot delete other people's messages" });
  }

  await deleteMessageDb(messageId);
  removeMessage(messageId, params.chatId);

  redirect(302, `/chat/${params.chatId}`);
}
