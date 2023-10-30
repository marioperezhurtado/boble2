import { Show, For, createEffect, createSignal, onCleanup } from "solid-js";
import { joinChat, subscribeToMessages, unsubscribeFromMessages } from "~/utils/chat";
import { Message } from "./Message";
import type { Messages } from "~/db/getMessages";

type MessageListProps = {
  initialMessages: Messages,
  lastReadAt: Date,
  chatId: string
  userId: string
}

export function MessageList(props: MessageListProps) {
  const [messages, setMessages] = createSignal(props.initialMessages);
  let messageList: HTMLUListElement | undefined = undefined;

  createEffect(() => {
    joinChat(props.chatId);
    setMessages(props.initialMessages);
  });

  subscribeToMessages((message) => {
    setMessages((messages) => [...messages, message]);
    if (!messageList) return;
    messageList.scrollTo({ top: messageList.scrollHeight, behavior: "smooth" });
  });

  onCleanup(() => unsubscribeFromMessages());

  return (
    <section ref={messageList} class="overflow-y-auto py-2 px-4 h-full bg-zinc-100">
      <Show when={messages().length === 0}>
        <div class="pt-5 text-center">
          <p class="mb-4 text-lg font-bold">No messages yet.</p>
          <p>Start the conversation to see your messages here.</p>
        </div>
      </Show>
      <ul class="flex flex-col h-full text-sm">
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
