import { createTRPCRouter } from "$lib/trpc/trpc";
import { sendImage } from "./sendImage";
import { sendVideo } from "./sendVideo";
import { sendDocument } from "./sendDocument";
import { sendAudio } from "./sendAudio";

export const messageRouter = createTRPCRouter({
  sendImage,
  sendVideo,
  sendDocument,
  sendAudio,
});
