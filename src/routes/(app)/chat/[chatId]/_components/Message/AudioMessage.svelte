<script lang="ts">
  import { getFileUrl } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";
  import MessageTransparent from "./MessageTransparent.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
</script>

<MessageTransparent {message} {lastReadAt} {isOwn} {isFirst}>
  {#if message.source}
    <!-- svelte-ignore a11y-media-has-caption -->
    <audio controls src={getFileUrl(message.source)} class="mb-1"/>
  {/if}
</MessageTransparent>
