import { Show } from "solid-js";
import type { Message } from "~/db/getMessages";

type MessageProps = {
  message: Message,
  prevMessage: Message,
  lastReadAt: Date,
  isOwn: boolean,
}

export function Message(props: MessageProps) {
  const prevDate = new Date(props.prevMessage?.createdAt!);
  const currentDate = new Date(props.message.createdAt!);
  const firstOfDate = prevDate.getDate() !== currentDate.getDate();
  const isFirst = props.prevMessage?.senderId !== props.message.senderId || firstOfDate;
  const isRead = props.lastReadAt >= props.message.createdAt!;

  return (
    <>
      <Show when={firstOfDate}>
        <DateIndicator date={props.message.createdAt!} />
      </Show>
      <li
        class={`relative flex items-end gap-x-2 pt-1.5 pb-1 pl-2.5 pr-1 bg-cyan-700 rounded-md shadow-sm 
      ${props.isOwn ? "self-end bg-cyan-700 text-white" : "self-start bg-white"}
      ${isFirst ? props.isOwn ? "rounded-tr-none" : "rounded-tl-none" : ""}
      ${isFirst ? "mt-2" : "mt-1"}`}
      >
        <p class="w-full">{props.message.text}</p>
        <p
          class={`leading-3 text-right text-[10px] flex min-w-fit gap-0.5 items-end
        ${props.isOwn ? "text-cyan-100" : "text-zinc-600"}`}
        >
          {formatMessageTime(props.message.createdAt!)}
          <Show when={props.isOwn}>
            <Show when={isRead}>
              <img 
                src="/icons/double-check.svg"
                alt="Read" 
                title="Read"
                class="-mb-0.5 w-4 h-4" 
              />
            </Show>
            <Show when={!isRead}>
              <img
                src="/icons/check.svg"
                alt="Sent"
                title="Sent"
                class="-mb-0.5 w-4 h-4"
              />
            </Show>
          </Show>
        </p>

        <Show when={isFirst}>
          <span
            class={`absolute top-0 w-0 h-0 border-transparent border-t-[10px]
          ${props.isOwn ? "border-t-cyan-700 border-r-[5px] -right-1" : "border-t-white border-l-[5px] -left-1"}`}
          />
        </Show>
      </li>
    </>
  );
}

function formatMessageTime(date: Date) {
  return new Date(date).toLocaleTimeString("es-ES", {
    hour: "numeric",
    minute: "numeric",
  });
}

function DateIndicator(props: { date: Date }) {
  return (
    <span class="py-1 px-1.5 mx-auto mt-2 text-xs bg-white rounded-md shadow-sm">
      {formatDate(new Date(props.date))}
    </span>
  );
}

function formatDate(date: Date) {
  const today = new Date();

  if (date.getFullYear() !== today.getFullYear() ||
    date.getMonth() !== today.getMonth()) {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  if (today.getDate() - date.getDate() > 6) {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }

  if (today.getDate() === date.getDate()) {
    return "Today";
  }

  if (today.getDate() - date.getDate() === 1) {
    return "Yesterday";
  }

  return date.toLocaleDateString("es-ES", {
    weekday: "long",
  });
}
