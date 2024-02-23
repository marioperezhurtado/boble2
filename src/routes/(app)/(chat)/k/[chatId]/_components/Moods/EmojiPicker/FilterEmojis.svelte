<script lang="ts">
  import type { EmojiData } from "./store";
  import Input from "$lib/ui/Input.svelte";

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
  <Input
    bind:value={search}
    name="search"
    type="search"
    placeholder="Search emojis"
    autocomplete="off"
  />
</div>
