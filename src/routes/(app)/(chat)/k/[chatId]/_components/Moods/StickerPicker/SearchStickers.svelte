<script lang="ts">
  import { debounce } from "$lib/utils/debounce";
  import Input from "$lib/ui/Input.svelte";

  export let onSearch: (search: string) => void;

  let search = "";
</script>

<div class="p-2 border-b">
  <!-- svelte-ignore a11y-autofocus -->
  <Input
    bind:value={search}
    on:keyup={debounce(() => onSearch(search))}
    name="search"
    type="search"
    placeholder="Search stickers in GIPHY"
    autocomplete="off"
  />
</div>
