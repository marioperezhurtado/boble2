import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { uploadImage } from "$lib/file-uploads/uploadImage";
import type { RequestEvent } from "../$types";

export async function sendImage({ request, params, locals }: RequestEvent) {
  const session = await getSessionRequired(locals.auth);
  const formData = await request.formData();

  const image = formData.get('image') as File | null;
  if (!image) {
    return fail(400, { error: 'Image is required' });
  }

  const blocked = await isBlockedInChat({
    userId: session.user.id,
    chatId: params.chatId,
  });
  if (blocked) {
    return fail(400, { error: "You can't send messages in this chat" });
  }

  const replyToId = formData.get('replyToId') as string | null;

  const uploadedImageId = await uploadImage(image);

  const newMessage = await createMessage({
    chatId: params.chatId,
    senderId: session.user.id,
    replyToId: replyToId ?? null,
    text: uploadedImageId,
    type: "image",
  });
  sendMessage({ ...newMessage, linkPreview: null });
}
