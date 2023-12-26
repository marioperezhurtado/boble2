<script lang="ts">
  import { page } from "$app/stores";
  import { replyingTo } from "../stores";
  import { downloadFile } from "$lib/utils/file";
  import { getFileUrl } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";
  import ContextMenu from "$lib/ui/ContextMenu/ContextMenu.svelte";
  import ContextMenuItem from "$lib/ui/ContextMenu/ContextMenuItem.svelte";

  export let message: Message;
  export let isOpen: boolean;
  export let isOwn: boolean;
  export let brokenFile = false;

  const isMedia = message.type !== "text" && message.type !== "link";

  function handleCopy() {
    navigator.clipboard.writeText(message.text ?? "");
    isOpen = false;
  }

  function handleReply() {
    $replyingTo = message;
    isOpen = false;
  }

  function handleOpenInNewTab() {
    if (!message.text) return;

    if (message.type === "gif" || message.type == "sticker") {
      window.open(message.text);
      isOpen = false;
      return;
    }

    window.open(getFileUrl(message.text));
    isOpen = false;
  }

  function handleDownload(message: Message) {
    if (!message.text) return;

    if (message.type === "gif" || message.type == "sticker") {
      downloadFile({
        url: message.text,
        type: message.type,
        createdAt: new Date(message.createdAt),
      });
      isOpen = false;
      return;
    }

    downloadFile({
      url: getFileUrl(message.text),
      type: message.type,
      createdAt: new Date(message.createdAt),
    });
    isOpen = false;
  }
</script>

<ContextMenu bind:isOpen>
  <ContextMenuItem
    text="Reply"
    icon="/icons/reply.svg"
    on:click={handleReply}
  />

  {#if isMedia && !brokenFile}
    <ContextMenuItem
      text="Open in new tab"
      icon="/icons/new-tab.svg"
      on:click={handleOpenInNewTab}
    />
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
      on:click={() => (isOpen = false)}
      danger
    />
  {:else}
    <ContextMenuItem text="Report message" icon="/icons/report.svg" danger />
  {/if}
</ContextMenu>
