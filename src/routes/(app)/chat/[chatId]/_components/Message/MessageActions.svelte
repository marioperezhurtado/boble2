<script lang="ts">
  import { page } from "$app/stores";
  import { replyingTo } from "../stores";
  import { downloadFile } from "$lib/utils/file";
  import type { Message } from "$lib/db/message/getMessages";
  import ContextMenu from "$lib/ui/ContextMenu/ContextMenu.svelte";
  import ContextMenuItem from "$lib/ui/ContextMenu/ContextMenuItem.svelte";

  export let message: Message;
  export let isOpen: boolean;
  export let isOwn: boolean;

  function handleCopy() {
    navigator.clipboard.writeText(message.text ?? "");
    isOpen = false;
  }

  function handleReply() {
    $replyingTo = message;
    isOpen = false;
  }

  function handleDownload(message: Message) {
    if (message.type === "text" || !message.text) return;

    downloadFile(message.text, message.type);
    isOpen = false;
  }
</script>

<ContextMenu bind:isOpen>
  <ContextMenuItem
    text="Reply"
    icon="/icons/reply.svg"
    on:click={handleReply}
  />

  {#if message.type !== "text"}
    <ContextMenuItem
      text="Download"
      icon="/icons/download.svg"
      on:click={() => handleDownload(message)}
    />
  {/if}

  <ContextMenuItem
    text="Copy text"
    icon="/icons/copy.svg"
    on:click={handleCopy}
  />
  <ContextMenuItem text="Pin message" icon="/icons/pin.svg" />

  {#if isOwn}
    <ContextMenuItem
      text="Delete message"
      icon="/icons/delete.svg"
      href="{$page.url.pathname}?deleteMessage={message.id}"
    />
  {:else}
    <ContextMenuItem text="Report message" icon="/icons/report.svg" danger />
  {/if}
</ContextMenu>
