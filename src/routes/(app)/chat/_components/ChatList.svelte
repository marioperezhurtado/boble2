<script lang="ts">
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import {
    joinChat,
    subscribeToMessages,
    unsubscribeFromMessages,
  } from "$lib/chat/chat";
  import { chats } from "$lib/chat/store";
  import FilterChats from "./FilterChats.svelte";
  import Chat from "./Chat.svelte";

  chats.set($page.data.chats);

  $: filteredChats = $chats;

  $: {
    $chats.forEach((chat) => {
      joinChat(chat.id);
    });
  }

  subscribeToMessages((message) => {
    chats.updateLastMessage(message.chatId, message);
  });

  onDestroy(() => unsubscribeFromMessages());
</script>

<FilterChats initialChats={$page.data.chats} bind:filteredChats />

{#if filteredChats.length > 0}
  <ul class="border-t">
    {#each $chats as chat}
      <Chat {chat} isSelected={chat.id === $page.params.chatId} />
    {/each}
  </ul>
{:else}
  <p class="py-1 pl-3 font-medium border-t">No chats found.</p>
{/if}
