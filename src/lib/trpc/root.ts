import { createTRPCRouter } from "$lib/trpc/trpc";
import { contactRouter } from "./routers/contact/router";

export const router = createTRPCRouter({
  contact: contactRouter,
});

export type Router = typeof router;
