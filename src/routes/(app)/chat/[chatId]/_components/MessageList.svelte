<script lang="ts">
  import { onDestroy, tick } from "svelte";
  import {
    onDeleteMessage,
    onMessage,
    unsubscribeFromMessages,
  } from "$lib/socket/client";
  import { chats } from "$lib/stores/chats";
  import { messages } from "./stores";
  import type { Messages } from "$lib/db/message/getMessages";
  import Message from "./Message/Message.svelte";
  import AddContactPrompt from "./AddContactPrompt.svelte";
  import ScrollBottomButton from "./ScrollBottomButton.svelte";

  export let initialMessages: Messages;
  export let lastReadAt: Date;
  export let chatId: string;
  export let userId: string;
  export let isSavedContact: boolean;

  $: chat = $chats.find((chat) => chat.id === chatId);

  let messageContainer: HTMLElement;
  let showScrollBottomButton = false;

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

  onMessage(async (message) => {
    if (message.chatId !== chatId) return;

    $messages = [...$messages, message];
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
  on:scroll={() => {
    if (isNearEnoughToBottom(0)) {
      showScrollBottomButton = false;
      chats.readChat(chatId);
      return;
    }
    showScrollBottomButton = true;
  }}
  bind:this={messageContainer}
  class="overflow-y-auto px-4 h-full flex flex-col bg-stone-100 bg-repeat
  bg-[url('/pattern.png')] scroll-smooth"
>
  {#if $messages.length === 0}
    <div class="pt-10 text-center">
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

  {#if showScrollBottomButton}
    <ScrollBottomButton
      onScrollBottom={scrollBottom}
      unreadCount={chat?.unreadCount ?? 0}
    />
  {/if}
</section>
