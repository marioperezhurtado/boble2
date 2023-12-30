<script lang="ts">
  import { getFileUrl } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";
  import Image from "$lib/ui/Image.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
  export let brokenFile = false;
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="overflow-hidden relative rounded-md">
    <div
      class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t to-transparent pointer-events-none from-black/40"
    />
    {#if message.text}
      <Image
        src={getFileUrl(message.text)}
        alt="Image sent by {message.senderId}"
        class="object-contain max-w-xs max-h-80 bg-zinc-100"
        draggable={false}
        bind:brokenFile
      />
    {/if}

    <div class="absolute right-1 bottom-1">
      <MessageStatus {message} {lastReadAt} {isOwn} />
    </div>
  </div>
</MessageBubble>
