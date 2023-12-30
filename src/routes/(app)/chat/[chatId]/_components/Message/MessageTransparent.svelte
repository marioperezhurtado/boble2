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
    class="w-fit ml-auto rounded-md p-1 pl-1.5 pt-0.5"
    class:bg-cyan-700={isOwn}
    class:bg-white={!isOwn}
  >
    <MessageStatus {message} {lastReadAt} {isOwn} />
  </div>
{/if}
