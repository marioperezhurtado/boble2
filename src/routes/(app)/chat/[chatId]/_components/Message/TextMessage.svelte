<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="flex flex-wrap justify-between items-end">
    <p class="px-1 break-all">{message.text}</p>
    <p
      class="flex gap-0.5 items-end pl-0.5 ml-auto leading-3 text-right text-[10px] min-w-fit"
      class:text-white={isOwn}
      class:text-zinc-600={!isOwn}
    >
      {formatTime(createdAt)}
      {#if isOwn}
        {#if isRead}
          <img
            src="/icons/double-check.svg"
            alt="Read"
            title="Read"
            class="-mb-0.5 w-4 h-4"
          />
        {:else}
          <img
            src="/icons/check.svg"
            alt="Sent"
            title="Sent"
            class="-mb-0.5 w-4 h-4"
          />
        {/if}
      {/if}
    </p>
  </div>
</MessageBubble>
