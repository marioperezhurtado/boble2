import { writable } from 'svelte/store';
import type { Chat } from "$lib/db/chat/getChats";

function createChatStore(initialChats: Chat[]) {
  const { subscribe, set, update } = writable<Chat[]>(initialChats);

  return {
    subscribe,
    set,
    updateLastMessage: (chatId: string, lastMessage: Chat["lastMessage"]) => {
      update((chats) => {
        const chat = chats.find((chat) => chat.id === chatId);

        if (!chat) return chats;

        // Update last message
        chat.lastMessage = lastMessage;
        chat.unreadCount++;

        // Move chat to first position
        chats = [chat, ...chats.filter((c) => c.id !== chatId)];

        return chats;
      });
    },
    readChat(chatId: string) {
      update((chats) => {
        const chat = chats.find((chat) => chat.id === chatId);

        if (!chat) return chats;

        // Clear unread count
        chat.unreadCount = 0;

        return chats;
      });
    },
  };
}

export const chats = createChatStore([]);
