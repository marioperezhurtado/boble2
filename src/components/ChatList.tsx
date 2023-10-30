import { For, createSignal, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { FilterChats } from "./FilterChats";
import { Chat } from "./Chat";
import type { Chats } from "~/db/getChats";

export function ChatList(props: { chats: Chats }) {
  const params = useParams<{ chatId: string }>();
  const [filteredChats, setFilteredChats] = createSignal<Chats>(props.chats);

  return (
    <section>
      <FilterChats initialChats={props.chats} setChats={setFilteredChats} />
      <Show 
        when={filteredChats()?.length > 0}
        fallback={<p class="pl-3 font-medium border-t">No chats found.</p>}
      >
        <ul class="border-t">
          <For each={filteredChats()}>
            {(chat) => <Chat chat={chat} isSelected={chat.id === params.chatId} />}
          </For>
        </ul>
      </Show>
    </section>
  );
}
