<script lang="ts">
  import { debounce } from "$lib/utils/debounce";

  export let onSearch: (search: string) => void;

  let search = "";
</script>

<div class="p-2 border-b">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    bind:value={search}
    on:keyup={debounce(() => onSearch(search))}
    name="search"
    type="search"
    placeholder="Search GIFs in GIPHY"
    class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 bg-zinc-50 focus:outline-cyan-600"
    autocomplete="off"
  />
</div>
