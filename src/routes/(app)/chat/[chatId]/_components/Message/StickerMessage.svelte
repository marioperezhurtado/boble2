<script lang="ts">
  import type { Message } from "$lib/db/message/getMessages";
  import Image from "$lib/ui/Image.svelte";
  import MessageTransparent from "./MessageTransparent.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
  export let brokenFile = false;
</script>

<MessageTransparent {message} {lastReadAt} {isOwn} {isFirst}>
  <Image
    bind:brokenFile
    src={message.text ?? ""}
    alt="Sticker"
    class="w-full rounded-md max-w-32 max-h-32 object-contain  mx-auto"
  />
</MessageTransparent>
