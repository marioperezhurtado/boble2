import { createTRPCRouter } from "$lib/trpc/trpc";
import { contactRouter } from "./routers/contact/router";
import { userRouter } from "./routers/user";
import { messageRouter } from "./routers/message/router";
import { presignedPostRouter } from "./routers/presignedPost";

export const router = createTRPCRouter({
  contact: contactRouter,
  user: userRouter,
  message: messageRouter,
  createPresignedPost: presignedPostRouter,
});

export type Router = typeof router;
