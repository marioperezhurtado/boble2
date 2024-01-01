import { fail, redirect } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isParticipant } from "$lib/db/participant/isParticipant";
import { getMessages } from "$lib/db/message/getMessages";
import { removeMessage } from "$lib/socket/client";
import { deleteMessage as deleteMessageDb } from "$lib/db/message/deleteMessage";
import { deleteFile } from "$lib/file-upload/deleteFile";
import { deleteDocumentInfo } from "$lib/db/documentInfo/deleteDocumentInfo";
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

  const isMedia = message.type === "image" || message.type === "video" || message.type === "document" || message.type === "audio";

  // Delete the file from s3 bucket
  if (isMedia && message.source) {
    await deleteFile(message.source);
  }

  // Delete document info from db
  if (message.type === "document" && message.source) {
    await deleteDocumentInfo(message.source);
  }

  redirect(302, `/chat/${params.chatId}`);
}
