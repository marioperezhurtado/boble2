import { createTRPCRouter, protectedProcedure } from "$lib/trpc/server/trpc";
import emojis from "./emojis.json";

export const emojiRouter = createTRPCRouter({
  getAll: protectedProcedure
    .query(() =>  emojis)
});
