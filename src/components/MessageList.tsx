import { Show, For } from "solid-js";
import { useMessages } from "~/utils/chat";
import type { Messages, Message } from "~/db/getMessages";

const TEMP_USER_ID = "3f480030-c961-48d4-9b75-e629690944ca";

export function MessageList(props: { initialMessages: Messages, chatId: string }) {
  const messages = useMessages(props.initialMessages, props.chatId);

  return (
    <section class="flex-grow px-4 pt-5 bg-zinc-100">
      <Show when={messages().length === 0}>
        <div class="pt-5 text-center">
          <p class="mb-4 text-lg font-bold">No messages yet.</p>
          <p>Start the conversation to see your messages here.</p>
        </div>
      </Show>
      <ul class="flex flex-col gap-2 text-sm">
        <For each={messages()}>
          {(message, i) => (
            <Message
              message={message}
              isFirst={messages()[i() - 1]?.senderId !== message.senderId}
            />
          )}
        </For>
      </ul>
    </section>
  );
}

function Message(props: { message: Message, isFirst: boolean }) {
  return (
    <Show
      when={props.message.senderId === TEMP_USER_ID}
      fallback={<OtherMessage message={props.message} isFirst={props.isFirst} />}
    >
      <OwnMessage message={props.message} isFirst={props.isFirst} />
    </Show>
  );
}

function OwnMessage(props: { message: Message, isFirst: boolean }) {
  return (
    <li
      class="relative self-end py-1.5 px-2.5 text-white bg-cyan-700 rounded-md shadow-sm"
      classList={{ "rounded-tr-none": props.isFirst }}
    >
      {props.message.text}
      <Show when={props.isFirst}>
        <div class="absolute top-0 -right-1 w-0 h-0 border-transparent border-t-[10px] border-r-[5px] border-t-cyan-700" />
      </Show>
    </li>
  );
}

function OtherMessage(props: { message: Message, isFirst: boolean }) {
  return (
    <li
      class="relative self-start py-1.5 px-2.5 bg-white rounded-md shadow-sm"
      classList={{ "rounded-tl-none": props.isFirst }}
    >
      {props.message.text}
      <Show when={props.isFirst}>
        <div class="absolute top-0 -left-1 w-0 h-0 border-transparent border-t-[10px] border-l-[5px] border-t-white" />
      </Show>
    </li>
  );
}
