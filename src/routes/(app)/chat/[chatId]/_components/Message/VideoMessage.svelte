<script lang="ts">
  import { getFileUrl } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="overflow-hidden relative rounded-md">
    {#if message.source}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video
        controls
        class="object-contain max-w-xs max-h-80 rounded-md bg-zinc-100"
        draggable={false}
      >
        <source src={getFileUrl(message.source)} />
      </video>
    {/if}

    {#if message.text}
      <div class="flex flex-wrap justify-between items-end mt-1 max-w-lg">
        <p class="px-1 break-all">{message.text}</p>
        <MessageStatus {message} {lastReadAt} {isOwn} />
      </div>
    {:else}
      <div
        class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t to-transparent pointer-events-none from-black/40"
      />
      <div class="absolute right-1 bottom-1">
        <MessageStatus {message} {lastReadAt} {isOwn} />
      </div>
    {/if}
  </div>
</MessageBubble>
