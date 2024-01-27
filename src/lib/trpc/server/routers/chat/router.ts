import { createTRPCRouter } from "$lib/trpc/server/trpc";
import { openChat } from "./openChat";
import { deleteChat } from "./deleteChat";

export const chatRouter = createTRPCRouter({
  open: openChat,
  delete: deleteChat,
});
