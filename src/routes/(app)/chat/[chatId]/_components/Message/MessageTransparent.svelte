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

{#if message.replyToId}
  <MessageBubble {message} {isOwn} {isFirst}>
    <slot />
    <p
      class="flex gap-0.5 items-end mt-1 leading-3 text-[10px] w-fit ml-auto"
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
  </MessageBubble>
{:else}
  <slot />

  <p
    class={`flex gap-0.5 items-end px-1 py-0.5 shadow-sm mt-1 rounded-md
    leading-3 text-[10px] w-fit ml-auto
      ${isOwn ? "bg-cyan-700" : "bg-white"}
    `}
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
{/if}
