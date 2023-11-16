<script lang="ts">
  import { enhance } from "$app/forms";
  import { capitalize } from "$lib/utils/text";

  let search = "";
</script>

<form
  action="?/searchGifs"
  method="post"
  use:enhance={() => {}}
  class="p-2 border-b"
>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    value={search}
    on:input={(e) => (search = capitalize(e.currentTarget.value))}
    id="search"
    name="search"
    type="search"
    placeholder="Search GIFs"
    class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 bg-zinc-50 focus:outline-cyan-600"
    autocomplete="off"
    autofocus
  />
</form>
