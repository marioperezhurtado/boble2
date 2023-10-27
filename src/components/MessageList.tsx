import { Show, For } from "solid-js";
import { useMessages } from "~/utils/chat";
import { Message } from "./Message";
import type { Messages } from "~/db/getMessages";

type MessageListProps = {
  initialMessages: Messages,
  chatId: string
  userId: string
}

export function MessageList(props: MessageListProps) {
  const messages = useMessages(props.initialMessages, props.chatId);

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
              isOwn={message.senderId === props.userId}
            />
          )}
        </For>
      </ul>
    </section>
  );
}
