import { writable } from 'svelte/store';
import type { Chat } from "$lib/db/chat/getChats";
import type { Message } from '$lib/db/message/getMessages';

// Adding a `deleted` property to be able to display lastMessage as deleted
export type DisplayChat = Omit<Chat, "lastMessage"> & {
  lastMessage: Chat["lastMessage"] & {
    deleted?: boolean;
  } | null;
};

function createChatStore(initialChats: DisplayChat[]) {
  const { subscribe, set, update } = writable<DisplayChat[]>(initialChats);

  return {
    subscribe,
    set,
    updateLastMessage: (chatId: string, lastMessage: Message) => {
      update((chats) => {
        const chat = chats.find((chat) => chat.id === chatId);
        if (!chat) return chats;

        // Update last message
        chat.lastMessage = lastMessage;
        chat.unreadCount++;

        // Update document name if last message is a document
        if (lastMessage?.type === "document") {
          chat.documentName = lastMessage.documentInfo?.name ?? null;
        }

        // Sort chats by last message created at date
        chats.sort((a, b) => {
          return (
            new Date(b.lastMessage?.createdAt!).getTime() -
            new Date(a.lastMessage?.createdAt!).getTime()
          );
        });

        return chats;
      });
    },
    deleteLastMessage: (chatId: string) => {
      update((chats) => {
        const chat = chats.find((chat) => chat.id === chatId);
        if (!chat || !chat.lastMessage) return chats;

        // Delete last message
        chat.lastMessage.deleted = true;

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
