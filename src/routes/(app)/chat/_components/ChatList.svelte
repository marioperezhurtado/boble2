<script lang="ts">
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "../$types";
  import {
    joinChat,
    onMessage,
    onDeleteMessage,
    unsubscribeFromMessages,
  } from "$lib/chat/chat";
  import { chats } from "$lib/chat/store";
  import FilterChats from "./FilterChats.svelte";
  import Chat from "./Chat.svelte";

  $: filteredChats = $chats;
  $: data = $page.data as PageData;

  $: {
    chats.set(data.chats);

    $chats.forEach((chat) => {
      joinChat(chat.id);
    });
  }

  onMessage((message) => {
    chats.updateLastMessage(message.chatId, message);
  });

  onDeleteMessage((messageId, chatId) => {
    const chat = $chats.find((chat) => chat.id === chatId);

    if (chat?.lastMessage?.id == messageId) {
      chats.deleteLastMessage(chatId);
    }
  });

  onDestroy(() => unsubscribeFromMessages());
</script>

<FilterChats initialChats={data.chats} bind:filteredChats />

{#if filteredChats.length > 0}
  <ul class="border-t">
    {#each $chats as chat}
      <Chat {chat} isSelected={chat.id === $page.params.chatId} />
    {/each}
  </ul>
{:else}
  <p class="py-1 pl-3 font-medium border-t">No chats found.</p>
{/if}
