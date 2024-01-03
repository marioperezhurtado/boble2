import { fail } from "@sveltejs/kit";
import { auth, getSessionRequired } from "$lib/auth/auth";
import { deleteChat } from "$lib/db/chat/deleteChat";
import { getChats } from "$lib/db/chat/getChats";
import { createBlock } from "$lib/db/block/createBlock";
import { removeBlock } from "$lib/db/block/removeBlock";
import type { Actions } from "./$types";

export const actions = {
  logout: async ({ locals }) => {
    const session = await getSessionRequired(locals.auth);

    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
  },
  blockUser: async ({ locals, request }) => {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const blockUserId = formData.get("blockUserId") as string;
    if (!blockUserId) {
      return fail(400, { error: "Blocked user is required" });
    }

    await createBlock({
      userId: session.user.id,
      blockUserId,
    });
  },
  unblockUser: async ({ locals, request }) => {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const unblockUserId = formData.get("unblockUserId") as string;
    if (!unblockUserId) {
      return fail(400, { error: "Blocked user is required" });
    }

    await removeBlock({
      userId: session.user.id,
      unblockUserId,
    });
  },
  deleteChat: async ({ request, locals }) => {
    const session = await getSessionRequired(locals.auth);

    const formData = await request.formData();
    const chatId = formData.get("chatId") as string;
    if (!chatId) {
      return fail(400, { error: "Chat id not found" });
    }

    const chats = await getChats(session.user.id);
    const chat = chats.find((chat) => chat.id === chatId);
    if (!chat) {
      return fail(400, { error: "Chat not found" });
    }

    return fail(400, { error: "something went wrong" });

    await deleteChat(chatId);
  },
} satisfies Actions;
