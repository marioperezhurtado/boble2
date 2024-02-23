<script lang="ts">
  import type { Chats } from "$lib/db/chat/getChats";
  import Input from "$lib/ui/Input.svelte";

  export let initialChats: Chats;
  export let filteredChats: Chats;

  let search = "";

  $: {
    const trimedSearch = search.trim();
    if (trimedSearch === "") {
      filteredChats = initialChats;
    } else {
      filteredChats = initialChats.filter((chat) =>
        chat.user.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }
  }
</script>

<div class="p-2">
  <Input
    bind:value={search}
    type="search"
    placeholder="Search chats"
    autocomplete="off"
  />
</div>
