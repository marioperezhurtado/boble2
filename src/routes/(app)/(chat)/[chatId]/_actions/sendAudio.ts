import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { createMessage } from "$lib/db/message/createMessage";
import { sendMessage } from "$lib/socket/client";
import { uploadAudio, AUDIO_UPLOAD_MAX_FILE_SIZE } from "$lib/file-upload/uploadFile";
import { createAudioInfo } from "$lib/db/audioInfo/createAudioInfo";
import type { RequestEvent } from "../$types";

export async function sendAudio({ request, params, locals }: RequestEvent) {
  const session = await getSessionRequired(locals.auth);
  const formData = await request.formData();

  const audio = formData.get('audio') as File | null;
  if (!audio) {
    return fail(400, { error: 'Audio is required' });
  }
  if (!audio.type.startsWith('audio/')) {
    return fail(400, { error: 'File must be an audio' });
  }
  if (audio.size > AUDIO_UPLOAD_MAX_FILE_SIZE) {
    return fail(400, { error: 'Audio is too large' });
  }

  const blocked = await isBlockedInChat({
    userId: session.user.id,
    chatId: params.chatId,
  });
  if (blocked) {
    return fail(400, { error: "You can't send messages in this chat" });
  }

  const duration = Number(formData.get('duration'));
  if (isNaN(duration)) {
    return fail(400, { error: 'Invalid duration' });
  }

  const volumeSpikes = formData.get('volumeSpikes') as string | null;
  if (!volumeSpikes) {
    return fail(400, { error: 'Invalid volume spikes' });
  }

  const replyToId = formData.get('replyToId') as string | null;
  const transcript = formData.get('transcript') as string | null;

  try {
    const uploadedAudioId = await uploadAudio(audio);

    const newMessage = await createMessage({
      chatId: params.chatId,
      senderId: session.user.id,
      replyToId: replyToId ?? null,
      source: uploadedAudioId,
      type: "audio",
    });

    const audioInfo = await createAudioInfo({
      url: uploadedAudioId,
      duration,
      transcript: transcript ?? null,
      volumeSpikes,
      messageId: newMessage.id,
    });

    sendMessage({ ...newMessage, linkPreview: null, documentInfo: null, audioInfo });
  } catch (e) {
    return fail(500, { error: "Error uploading audio" });
  }
}
