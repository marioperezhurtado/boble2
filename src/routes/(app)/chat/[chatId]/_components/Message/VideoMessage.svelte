<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import { getFileUrl } from "$lib/utils/url";
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
  <div class="overflow-hidden relative rounded-md">
    <div
      class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t to-transparent pointer-events-none from-black/40"
    />
    {#if message.text}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        controls
        class="object-contain max-w-xs max-h-80 bg-zinc-100"
        draggable={false}
      >
        <source src={getFileUrl(message.text)} />
      </video>
    {/if}
    <p
      class="flex absolute right-1 bottom-1 gap-0.5 items-end leading-3 text-right text-white pointer-events-none text-[10px] min-w-fit"
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
