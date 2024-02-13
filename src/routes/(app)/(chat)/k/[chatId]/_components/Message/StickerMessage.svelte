<script lang="ts">
  import type { Message } from "$lib/db/message/getMessages";
  import MessageTransparent from "./MessageTransparent.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
</script>

<MessageTransparent {message} {lastReadAt} {isOwn} {isFirst}>
  <img
    src={message.text ?? ""}
    alt="Sticker"
    class="object-contain pb-0.5 mx-auto w-full max-h-32 rounded-md max-w-32"
  />
</MessageTransparent>
