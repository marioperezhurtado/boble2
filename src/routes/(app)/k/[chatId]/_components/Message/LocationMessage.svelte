<script lang="ts">
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";
  import Map from "$lib/ui/Map.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;

  const coords = message.source?.split(",").map(Number);
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  {#if coords}
    <Map
      title="Location sent at {message.createdAt}"
      latitude={coords[0]}
      longitude={coords[1]}
      class="w-full aspect-video rounded-md"
    />
  {/if}

  <div class="flex flex-wrap justify-between items-end mt-1 max-w-lg">
    {#if message.text}
      <p class="px-1 break-all">{message.text}</p>
    {/if}
    <MessageStatus {message} {lastReadAt} {isOwn} />
  </div>
</MessageBubble>
