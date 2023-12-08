<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    onDeleteMessage,
    onMessage,
    unsubscribeFromMessages,
  } from "$lib/chat/chat";
  import { chats } from "$lib/chat/store";
  import { messages } from "./stores";
  import type { Messages } from "$lib/db/message/getMessages";
  import Message from "./Message/Message.svelte";
  import AddContactPrompt from "./AddContactPrompt.svelte";

  export let initialMessages: Messages;
  export let lastReadAt: Date;
  export let chatId: string;
  export let userId: string;
  export let isSavedContact: boolean;

  $messages = initialMessages;

  $: {
    chats.readChat(chatId);
    $messages = initialMessages;
  }

  onMessage((message) => {
    if (message.chatId !== chatId) return;

    $messages = [...$messages, message];
    chats.readChat(chatId);
  });

  onDeleteMessage((messageId, chatId) => {
    if (chatId !== chatId) return;

    $messages = $messages.filter((message) => message.id !== messageId);
  });

  onDestroy(() => unsubscribeFromMessages());
</script>

<section
  class="overflow-y-auto px-4 h-full flex flex-col bg-stone-100 bg-repeat bg-[url('/pattern.png')]"
>
  {#if $messages.length === 0}
    <div class="pt-10 text-center">
      <p class="mb-4 text-lg font-bold">No messages yet</p>
      <p>Start the conversation to see your messages here.</p>
    </div>
  {:else}
    <ul class="flex flex-col pb-4 text-sm">
      {#each $messages as message, i}
        <Message
          {message}
          prevMessage={$messages[i - 1]}
          {lastReadAt}
          isOwn={message.senderId === userId}
        />
      {/each}
    </ul>
  {/if}
  {#if !isSavedContact}
    <AddContactPrompt />
  {/if}
</section>
