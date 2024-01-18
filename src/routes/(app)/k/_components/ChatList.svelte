<script lang="ts">
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "../$types";
  import {
    joinChat,
    onMessage,
    onDeleteMessage,
    unsubscribeFromMessages,
  } from "$lib/socket/client";
  import { chats } from "$lib/stores/chats";
  import FilterChats from "./FilterChats.svelte";
  import Chat from "./Chat.svelte";

  let filteredChats = $chats;

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

<FilterChats initialChats={$chats} bind:filteredChats />

<div class="border-t">
  {#if filteredChats.length > 0}
    <ul>
      {#each filteredChats as chat}
        <Chat {chat} isSelected={chat.id === $page.params.chatId} />
      {/each}
    </ul>
  {:else if $chats.length > 0}
    <p class="p-2 font-medium text-zinc-500">No chats found.</p>
  {:else}
    <p class="p-2 font-medium text-zinc-500">No chats yet.</p>
  {/if}
</div>
