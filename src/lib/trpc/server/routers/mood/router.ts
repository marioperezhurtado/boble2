import { createTRPCRouter } from "$lib/trpc/server/trpc";
import { gifRouter } from "./gif";
import { stickerRouter } from "./sticker";
import { emojiRouter } from "./emoji";

export const moodRouter = createTRPCRouter({
  gif: gifRouter,
  sticker: stickerRouter,
  emoji: emojiRouter,
});
