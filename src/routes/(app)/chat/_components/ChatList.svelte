<script lang="ts">
  import { page } from "$app/stores";
  import FilterChats from "./FilterChats.svelte";
  import Chat from "./Chat.svelte";
  import type { Chats } from "$lib/db/getChats";

  export let chats: Chats;

  let filteredChats = chats;
</script>

<FilterChats initialChats={chats} bind:filteredChats />

{#if filteredChats.length > 0}
  <ul class="border-t">
    {#each filteredChats as chat}
      <Chat {chat} isSelected={chat.id === $page.params.chatId} />
    {/each}
  </ul>
{:else}
  <p class="py-1 pl-3 font-medium border-t">No chats found.</p>
{/if}
