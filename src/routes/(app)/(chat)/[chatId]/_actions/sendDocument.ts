import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import {
  uploadDocument,
  DOCUMENT_UPLOAD_MAX_FILE_SIZE,
} from "$lib/file-upload/uploadFile";
import { createDocumentInfo } from "$lib/db/documentInfo/createDocumentInfo";
import type { RequestEvent } from "../$types";

export async function sendDocument({ request, params, locals }: RequestEvent) {
  const session = await getSessionRequired(locals.auth);
  const formData = await request.formData();

  const documentFile = formData.get("document") as File | null;
  if (!documentFile) {
    return fail(400, { error: "Document is required" });
  }
  if (documentFile.size > DOCUMENT_UPLOAD_MAX_FILE_SIZE) {
    return fail(400, { error: "Document is too large" });
  }

  const blocked = await isBlockedInChat({
    userId: session.user.id,
    chatId: params.chatId,
  });
  if (blocked) {
    return fail(400, { error: "You can't send messages in this chat" });
  }

  const replyToId = formData.get("replyToId") as string | null;
  const caption = formData.get("caption") as string | null;

  try {
    const uploadedDocumentId = await uploadDocument(documentFile);

    const documentInfo = await createDocumentInfo({
      url: uploadedDocumentId,
      name: documentFile.name,
      size: documentFile.size,
    });

    const newMessage = await createMessage({
      chatId: params.chatId,
      senderId: session.user.id,
      replyToId: replyToId ?? null,
      text: caption ?? null,
      source: uploadedDocumentId,
      type: "document",
    });

    sendMessage({ ...newMessage, linkPreview: null, documentInfo });
  } catch (e) {
    return fail(500, { error: "Error uploading document" });
  }
}
