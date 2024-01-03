import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import {
  uploadImage,
  IMAGE_UPLOAD_MAX_FILE_SIZE,
} from "$lib/file-upload/uploadFile";
import type { RequestEvent } from "../$types";

export async function sendImage({ request, params, locals }: RequestEvent) {
  const session = await getSessionRequired(locals.auth);
  const formData = await request.formData();

  const image = formData.get("image") as File | null;
  if (!image) {
    return fail(400, { error: "Image is required" });
  }
  if (!image.type.startsWith("image/")) {
    return fail(400, { error: "File must be an image" });
  }
  if (image.size > IMAGE_UPLOAD_MAX_FILE_SIZE) {
    return fail(400, { error: "Image is too large" });
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
    const uploadedImageId = await uploadImage(image);

    const newMessage = await createMessage({
      chatId: params.chatId,
      senderId: session.user.id,
      replyToId: replyToId ?? null,
      text: caption ?? null,
      source: uploadedImageId,
      type: "image",
    });
    sendMessage({ ...newMessage, linkPreview: null, documentInfo: null });
  } catch (e) {
    return fail(500, { error: "Error uploading image" });
  }
}
