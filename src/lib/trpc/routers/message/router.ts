import { createTRPCRouter } from "$lib/trpc/trpc";
import { sendText } from "./sendText";
import { sendLink } from "./sendLink";
import { sendImage } from "./sendImage";
import { sendVideo } from "./sendVideo";
import { sendDocument } from "./sendDocument";
import { sendAudio } from "./sendAudio";
import { sendGif } from "./sendGif";
import { sendSticker } from "./sendSticker";
import { deleteMessage } from "./deleteMessage";
import { getMediaMessages } from "./getMediaMessages";
import { generateLinkPreview } from "./generateLinkPreview";

export const messageRouter = createTRPCRouter({
  sendText,
  sendLink,
  sendImage,
  sendVideo,
  sendDocument,
  sendAudio,
  sendGif,
  sendSticker,
  delete: deleteMessage,
  getMediaMessages,
  generateLinkPreview,
});
