import { createEffect, createSignal } from "solid-js";
import { capitalize } from "~/utils/text";
import type { Chats } from "~/db/getChats"

export function FilterChats(props: { initialChats: Chats, setChats: (chats: Chats) => void }) {
  const [search, setSearch] = createSignal("");

  function filterBySearch(search: string) {
    props.setChats(
      props.initialChats.filter((chat) =>
        chat.user.name?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  createEffect(() => {
    const trimedSearch = search().trim();
    if (trimedSearch === "") {
      props.setChats(props.initialChats);
      return;
    }
    filterBySearch(trimedSearch);
  });

  return (
    <div class="flex gap-2 p-2">
      <input
        value={search()}
        onInput={(e) => setSearch(capitalize(e.currentTarget.value))}
        id="search"
        name="search"
        type="search"
        placeholder="Search chats"
        class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
        autocomplete="off"
      />
      <button
        type="button"
        title="Sort chats"
        aria-label="Sort chats"
        class="rounded-md focus:outline-cyan-600"
      >
        <img src="/icons/sort.svg" alt="Sort chats" class="w-6 h-6" />
      </button>
    </div>
  );
}
