<script lang="ts">
  import { enhance } from "$app/forms";

  let search = "";
</script>

<form
  action="?/searchStickers"
  method="post"
  use:enhance
  class="p-2 border-b"
>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    bind:value={search}
    id="search"
    name="search"
    type="search"
    placeholder="Search stickers in GIPHY"
    class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 bg-zinc-50 focus:outline-cyan-600"
    autocomplete="off"
  />
</form>
