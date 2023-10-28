import { For, Show, createSignal } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { Avatar } from "./Avatar";
import type { Chats } from "~/db/getChats";
import { FilterChats } from "./FilterChats";

export function ChatList(props: { chats: Chats }) {
  const params = useParams<{ chatId: string }>();
  const [filteredChats, setFilteredChats] = createSignal<Chats>(props.chats);

  return (
    <section class="w-full max-w-sm bg-zinc-50">
      <FilterChats initialChats={props.chats} setChats={setFilteredChats} />
      <ul class="border-t">
        <For each={filteredChats()}>
          {(chat) => (
            <li>
              <A href={`/chat/${chat.id}`}
                class="flex gap-3 p-2 border-b border-r-[3px] border-r-transparent"
                classList={{
                  "bg-zinc-100 !border-r-cyan-600": params.chatId === chat.id,
                }}
              >
                <Avatar image={chat.user.image} name={chat.user.name ?? ""} />
                <div class="flex flex-col flex-1 gap-0.5">
                  <p class="font-medium">{chat.user.name}</p>
                  <Show when={chat.lastMessage}>
                    <p
                      class="w-64 text-sm text-zinc-600 truncate"
                      title={chat.lastMessage!.text ?? ""}
                    >
                      <Show when={chat.lastMessage!.senderId !== chat.user.id}>
                        Me:{" "}
                      </Show>
                      {chat.lastMessage!.text}
                    </p>
                  </Show>
                </div>
                <div class="flex flex-col justify-between items-end py-1">
                  <time class="text-xs text-zinc-600">
                    <Show
                      when={chat.lastMessage}
                      fallback={new Date(chat.createdAt!).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    >
                      {new Date(chat.lastMessage!.createdAt!)
                        .toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </Show>
                  </time>
                  <Show when={chat.unreadCount > 0}>
                    <p class="px-1.5 pt-0.5 font-mono text-xs text-center text-cyan-50 bg-cyan-600 rounded-full">
                      {chat.unreadCount}
                    </p>
                  </Show>
                </div>
              </A>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
