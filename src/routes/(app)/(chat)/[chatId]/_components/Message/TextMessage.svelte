<script lang="ts">
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="flex flex-wrap gap-1 justify-between items-end max-w-lg">
    <p class="px-1 break-all">{message.text}</p>
    <MessageStatus {message} {lastReadAt} {isOwn} />
  </div>
</MessageBubble>
