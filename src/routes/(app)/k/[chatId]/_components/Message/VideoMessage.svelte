<script lang="ts">
  import { getFileUrl } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";
  import AspectRatio from "$lib/ui/AspectRatio.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;

  const MAX_WIDTH = 320;
  const MAX_HEIGHT = 320;
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="overflow-hidden relative rounded-md">
    {#if message.source}
      {#if message.videoInfo}
        <AspectRatio
          width={message.videoInfo.width}
          height={message.videoInfo.height}
          maxWidth={MAX_WIDTH}
          maxHeight={MAX_HEIGHT}
        >
          <!-- svelte-ignore a11y-media-has-caption -->
          <video
            class="object-cover w-full h-full rounded-md bg-zinc-100"
            draggable={false}
            playsinline
            controls
          >
            <source src={getFileUrl(message.source)} />
          </video>
        </AspectRatio>
      {:else}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video
          class="object-contain w-full max-w-xs h-full max-h-80 rounded-md bg-zinc-100"
          draggable={false}
          playsinline
          controls
        >
          <source src={getFileUrl(message.source)} />
        </video>
      {/if}
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
