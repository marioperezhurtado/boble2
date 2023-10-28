import { createEffect, createSignal } from "solid-js";
import emojis from "./emojis.json";

type FilterEmojisProps = {
  setEmojis: (filteredEmojis: typeof emojis) => void;
};

export function FilterEmojis(props: FilterEmojisProps) {
  const [search, setSearch] = createSignal("");

  function filterBySearch(search: string) {
    const newEmojis = Object.fromEntries(
      Object.entries(emojis).map(([category, emojis]) => [
        category,
        emojis.filter((emoji) =>
          emoji.n.some((name) => name.toLowerCase().includes(search.toLowerCase()))
        ),
      ])
    );

    props.setEmojis(newEmojis as typeof emojis);
  }

  createEffect(() => {
    const trimedSearch = search().trim();
    if (trimedSearch === "") {
      props.setEmojis(emojis);
      return;
    }
    filterBySearch(trimedSearch);
  });

  return (
    <div class="px-2 pt-2">
      <input
        value={search()}
        onInput={(e) => setSearch(e.currentTarget.value)}
        id="search"
        name="search"
        type="search"
        placeholder="Search emojis"
        class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 bg-zinc-50 focus:outline-cyan-600"
        autocomplete="off"
      />
    </div>
  );
}
