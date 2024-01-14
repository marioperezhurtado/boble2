import { createTRPCRouter } from "$lib/trpc/trpc";
import { contactRouter } from "./routers/contact/router";
import { userRouter } from "./routers/user";

export const router = createTRPCRouter({
  contact: contactRouter,
  user: userRouter,
});

export type Router = typeof router;
