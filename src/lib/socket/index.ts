import type { Message } from "$lib/db/message/getMessages";

export type ClientToServerEvents = {
  join: (chatId: string) => void;
  message: (message: Message) => void;
  deleteMessage: (messageId: string, chatId: string) => void;
};

export type ServerToClientEvents = {
  message: (message: Message) => void;
  deleteMessage: (messageId: string, chatId: string) => void;
};
