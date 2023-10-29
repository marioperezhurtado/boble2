import { For, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";
import { FilterChats } from "./FilterChats";
import { Chat } from "./Chat";
import type { Chats } from "~/db/getChats";

export function ChatList(props: { chats: Chats }) {
  const params = useParams<{ chatId: string }>();
  const [filteredChats, setFilteredChats] = createSignal<Chats>(props.chats);

  return (
    <section class="w-full max-w-sm bg-zinc-50">
      <FilterChats initialChats={props.chats} setChats={setFilteredChats} />
      <ul class="border-t">
        <For each={filteredChats()}>
          {(chat) => <Chat chat={chat} isSelected={chat.id === params.chatId} />}
        </For>
      </ul>
    </section>
  );
}
