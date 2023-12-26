import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { uploadVideo, VIDEO_UPLOAD_MAX_FILE_SIZE } from "$lib/file-upload/uploadFile";
import type { RequestEvent } from "../$types";

export async function sendVideo({ request, params, locals }: RequestEvent) {
  const session = await getSessionRequired(locals.auth);
  const formData = await request.formData();

  const video = formData.get('video') as File | null;
  if (!video) {
    return fail(400, { error: 'Video is required' });
  }
  if (!video.type.startsWith('video/')) {
    return fail(400, { error: 'File must be a video' });
  }
  if (video.size > VIDEO_UPLOAD_MAX_FILE_SIZE) {
    return fail(400, { error: 'Video is too large' });
  }

  const blocked = await isBlockedInChat({
    userId: session.user.id,
    chatId: params.chatId,
  });
  if (blocked) {
    return fail(400, { error: "You can't send messages in this chat" });
  }

  const replyToId = formData.get('replyToId') as string | null;

  const uploadedVideoId = await uploadVideo(video);

  const newMessage = await createMessage({
    chatId: params.chatId,
    senderId: session.user.id,
    replyToId: replyToId ?? null,
    text: uploadedVideoId,
    type: "video",
  });
  sendMessage({ ...newMessage, linkPreview: null });
}
