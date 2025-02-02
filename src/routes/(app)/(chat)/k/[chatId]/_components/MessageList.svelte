<script lang="ts">
  import { onDestroy, tick } from "svelte";
  import {
    onDeleteMessage,
    onMessage,
    unsubscribeFromMessages,
  } from "$lib/socket/client";
  import { decryptMessage } from "$lib/utils/encryption";
  import { chats } from "$lib/stores/chats";
  import { messages } from "$lib/stores/store";
  import type { Messages } from "$lib/db/message/getMessages";
  import Message from "./Message/Message.svelte";
  import EncryptionPrompt from "./EncryptionPrompt.svelte";
  import AddContactPrompt from "./AddContactPrompt.svelte";
  import ScrollBottom from "./ScrollBottom.svelte";

  export let initialMessages: Messages;
  export let lastReadAt: Date;
  export let chatId: string;
  export let userId: string;
  export let isSavedContact: boolean;

  $: chat = $chats.find((chat) => chat.id === chatId);

  let messageContainer: HTMLElement;
  let showScrollBottom = false;

  // Change messages on chat change
  $: if (chatId) {
    messages.set(initialMessages);
  }

  // Scroll bottom instantly on chat change
  $: if (chatId) {
    tick().then(() => {
      messageContainer?.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "instant",
      });
    });
  }

  function scrollBottom() {
    messageContainer?.scrollTo({
      top: messageContainer.scrollHeight,
      behavior: "smooth",
    });
  }

  function isNearEnoughToBottom(distance: number) {
    return (
      messageContainer.scrollTop + messageContainer.clientHeight >=
      messageContainer.scrollHeight - distance
    );
  }

  function handleScroll() {
    if (isNearEnoughToBottom(10)) {
      showScrollBottom = false;
      chats.readChat(chatId);
      return;
    }
    showScrollBottom = true;

    // Close message actions context menu
    messageContainer.click();
  }

  onMessage(async (message) => {
    if (message.chatId !== chatId) return;

    const decryptedMessage = await decryptMessage(message, chatId);

    $messages = [...$messages, decryptedMessage];
    await tick();

    // Scroll bottom if message is own or user is near bottom
    if (message.senderId === userId || isNearEnoughToBottom(300)) {
      scrollBottom();
    }
  });

  onDeleteMessage((messageId, chatId2) => {
    if (chatId !== chatId2) return;

    $messages = $messages.filter((message) => message.id !== messageId);
  });

  onDestroy(() => unsubscribeFromMessages());
</script>

<section
  on:scroll={handleScroll}
  bind:this={messageContainer}
  class="overflow-y-scroll px-4 h-full flex flex-col bg-stone-100 bg-repeat
  bg-[url('/pattern.webp')] scroll-smooth"
>
  <EncryptionPrompt />

  {#if $messages.length === 0}
    <div class="mt-16 text-center">
      <p class="mb-4 text-lg font-bold">No messages yet</p>
      <p>Start the conversation to see your messages here.</p>
    </div>
  {:else}
    <ul class="flex flex-col pb-4 text-sm">
      {#each $messages as message, i (message.id)}
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

  {#if showScrollBottom}
    <ScrollBottom
      onScrollBottom={scrollBottom}
      unreadCount={chat?.unreadCount ?? 0}
    />
  {/if}
</section>
