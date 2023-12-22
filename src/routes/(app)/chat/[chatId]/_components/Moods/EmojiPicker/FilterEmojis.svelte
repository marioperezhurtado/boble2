<script lang="ts">
  import emojis from "./emojis.json";
  import { capitalize } from "$lib/utils/text";
  import { filteredEmojis } from "./store";

  let search = "";
  $: trimmedSearch = search.trim();

  function filterBySearch(search: string) {
    const newEmojis = Object.fromEntries(
      Object.entries(emojis).map(([category, emojis]) => [
        category,
        emojis.filter((emoji) =>
          emoji.n.some((name) =>
            name.toLowerCase().includes(search.toLowerCase())
          )
        ),
      ])
    );

    $filteredEmojis = newEmojis as typeof emojis;
  }

  $: {
    if (trimmedSearch === "") {
      $filteredEmojis = emojis;
    } else {
      filterBySearch(trimmedSearch);
    }
  }
</script>

<div class="px-2 pt-2">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    value={search}
    on:input={(e) => (search = capitalize(e.currentTarget.value))}
    id="search"
    name="search"
    type="search"
    placeholder="Search emojis"
    class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 bg-zinc-50 focus:outline-cyan-600"
    autocomplete="off"
  />
</div>
