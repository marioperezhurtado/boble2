import { Show, For, createEffect, createSignal, onCleanup } from "solid-js";
import { joinChat, subscribeToMessages, unsubscribeFromMessages } from "~/utils/chat";
import { Message } from "./Message";
import { addNotification } from "./Notifications";
import type { Messages } from "~/db/getMessages";

type MessageListProps = {
  initialMessages: Messages,
  lastReadAt: Date,
  chatId: string
  userId: string
}

export function MessageList(props: MessageListProps) {
  const [messages, setMessages] = createSignal(props.initialMessages);

  createEffect(() => joinChat(props.chatId));

  subscribeToMessages((message) => {
    if (message.chatId !== props.chatId) {
      addNotification({
        title: "New message",
        description: message.text ?? "",
        createdAt: new Date(),
      });
      return;
    }

    setMessages((messages) => [...messages, message]);
  });

  onCleanup(() => unsubscribeFromMessages());

  return (
    <section class="flex-grow px-4 pt-2 bg-zinc-100">
      <Show when={messages().length === 0}>
        <div class="pt-5 text-center">
          <p class="mb-4 text-lg font-bold">No messages yet.</p>
          <p>Start the conversation to see your messages here.</p>
        </div>
      </Show>
      <ul class="flex flex-col text-sm">
        <For each={messages()}>
          {(message, i) => (
            <Message
              message={message}
              prevMessage={messages()[i() - 1]}
              lastReadAt={props.lastReadAt}
              isOwn={message.senderId === props.userId}
            />
          )}
        </For>
      </ul>
    </section>
  );
}
