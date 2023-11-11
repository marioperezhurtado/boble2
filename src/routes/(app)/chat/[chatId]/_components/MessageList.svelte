<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    joinChat,
    subscribeToMessages,
    unsubscribeFromMessages,
  } from "$lib/utils/chat";
  import type { Messages } from "$lib/db/message/getMessages";
  import Message from "./Message.svelte";
  import AddContactPrompt from "./AddContactPrompt.svelte";

  export let initialMessages: Messages;
  export let lastReadAt: Date;
  export let chatId: string;
  export let userId: string;

  let messages = initialMessages;
  let messageList: HTMLElement | undefined = undefined;

  $: {
    joinChat(chatId);
    messages = initialMessages;
  }

  subscribeToMessages((message) => {
    messages = [...messages, message];
    if (!messageList) return;
    messageList.scrollTo({ top: messageList.scrollHeight, behavior: "smooth" });
  });

  onDestroy(() => unsubscribeFromMessages());
</script>

<section
  bind:this={messageList}
  class="overflow-y-auto px-4 pb-4 h-full bg-zinc-100 bg-repeat bg-[url('/pattern.png')]"
>
  {#if messages.length === 0}
    <div class="pt-10 text-center">
      <p class="mb-4 text-lg font-bold">No messages yet</p>
      <p>Start the conversation to see your messages here.</p>
    </div>
  {:else}
    <ul class="flex flex-col h-full text-sm">
      {#each messages as message, i}
        <Message
          {message}
          prevMessage={messages[i - 1]}
          {lastReadAt}
          isOwn={message.senderId === userId}
        />
      {/each}
      <AddContactPrompt />
    </ul>
  {/if}
</section>
