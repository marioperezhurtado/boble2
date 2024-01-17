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
    class="object-contain pb-0.5 mx-auto w-full max-h-32 rounded-md max-w-32"
  />
</MessageTransparent>
