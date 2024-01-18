<script lang="ts">
  import type { EmojiData } from "./store";

  export let initialEmojis: EmojiData | null = null;
  export let filteredEmojis: EmojiData | null = null;

  let search = "";

  $: trimmedSearch = search.trim();

  function filterBySearch(search: string) {
    if (!initialEmojis) return;

    filteredEmojis = Object.fromEntries(
      Object.entries(initialEmojis).map(([category, emojis]) => [
        category,
        emojis.filter((emoji) =>
          emoji.n.some((name) =>
            name.toLowerCase().includes(search.toLowerCase()),
          ),
        ),
      ]),
    ) as EmojiData;
  }

  $: if (trimmedSearch === "") {
    filteredEmojis = initialEmojis;
  } else {
    filterBySearch(trimmedSearch);
  }
</script>

<div class="px-2 pt-2">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    bind:value={search}
    id="search"
    name="search"
    type="search"
    placeholder="Search emojis"
    class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 bg-zinc-50 focus:outline-cyan-600"
    autocomplete="off"
  />
</div>
