import { Show } from "solid-js";
import { A } from "solid-start";
import { Chats } from "~/db/getChats";
import { Avatar } from "./Avatar";

export function Chat(props: { chat: Chats[number], isSelected: boolean }) {
  const isLastMessageOwn = props.chat.lastMessage?.senderId !== props.chat.user.id;
  const lastReadAt = props.chat.lastReadAt ?? props.chat.createdAt;
  const isLastMessageRead = props.chat.lastMessage?.createdAt! <= lastReadAt!;

  return (
    <li>
      <A href={`/chat/${props.chat.id}`}
        class="flex gap-3 p-2 border-b border-r-[3px] border-r-transparent"
        classList={{
          "bg-zinc-100 !border-r-cyan-600": props.isSelected,
        }}
      >
        <Avatar image={props.chat.user.image} name={props.chat.user.name ?? ""} />
        <div class="flex flex-col flex-1 gap-0.5">
          <p class="font-medium">{props.chat.user.name}</p>
          <Show when={props.chat.lastMessage}>
            <p
              class="text-sm text-zinc-600 flex gap-0.5 items-center"
              title={props.chat.lastMessage!.text ?? ""}
            >
              <Show when={isLastMessageOwn}>
                <Show when={isLastMessageRead}>
                  <img
                    src="/icons/double-check-dark.svg"
                    alt="Read"
                    title="Read"
                    class="-mb-0.5 w-4 h-4"
                  />
                </Show>
                <Show when={!isLastMessageRead}>
                  <img
                    src="/icons/check-dark.svg"
                    alt="Sent"
                    title="Sent"
                    class="-mb-0.5 w-4 h-4"
                  />
                </Show>
              </Show>
              {props.chat.lastMessage!.text?.slice(0, 35)}
              <Show when={props.chat.lastMessage!.text?.length! > 30}>
                ...
              </Show>
            </p>
          </Show>
        </div>
        <div class="flex flex-col justify-between items-end py-1">
          <time class="text-xs text-zinc-600">
            <Show
              when={props.chat.lastMessage}
              fallback={formatLastMessageAt(new Date(props.chat.createdAt!))}
            >
              {formatLastMessageAt(new Date(props.chat.lastMessage!.createdAt!))}
            </Show>
          </time>
          <Show when={props.chat.unreadCount > 0}>
            <p class="px-1.5 pt-0.5 font-mono text-xs text-center text-cyan-50 bg-cyan-600 rounded-full">
              {props.chat.unreadCount}
            </p>
          </Show>
        </div>
      </A>
    </li>
  );
}

function formatLastMessageAt(date: Date) {
  const today = new Date();

  if (date.getFullYear() !== today.getFullYear() ||
    date.getMonth() !== today.getMonth()) {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  if (today.getDate() - date.getDate() > 6) {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  if (today.getDate() === date.getDate()) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (today.getDate() - date.getDate() === 1) {
    return "Yesterday";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
  });
}
