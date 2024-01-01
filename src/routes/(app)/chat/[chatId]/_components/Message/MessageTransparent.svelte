<script lang="ts">
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
</script>

{#if message.replyToId}
  <MessageBubble {message} {isOwn} {isFirst}>
    <slot />
    <MessageStatus {message} {lastReadAt} {isOwn} />
  </MessageBubble>
{:else}
  <slot />

  <div
    class="p-1 pt-0.5 pl-1.5 ml-auto rounded-md w-fit"
    class:bg-cyan-700={isOwn}
    class:bg-white={!isOwn}
  >
    <MessageStatus {message} {lastReadAt} {isOwn} />
  </div>
{/if}
