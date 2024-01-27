import { createTRPCRouter } from "$lib/trpc/server/trpc";
import { contactRouter } from "./routers/contact/router";
import { userRouter } from "./routers/user/router";
import { messageRouter } from "./routers/message/router";
import { chatRouter } from "./routers/chat/router";
import { moodRouter } from "./routers/mood/router";
import { presignedPostRouter } from "./routers/presignedPost";
import { authRouter } from "./routers/auth/router";

export const appRouter = createTRPCRouter({
  contact: contactRouter,
  user: userRouter,
  message: messageRouter,
  chat: chatRouter,
  mood: moodRouter,
  createPresignedPost: presignedPostRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
