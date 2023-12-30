<script lang="ts">
  import { formatFileSize } from "$lib/utils/file";
  import { getFileUrl } from "$lib/utils/url";
  import { downloadFile } from "$lib/utils/file";
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;

  const documentInfo = message.documentInfo;

  function handleDownloadDocument() {
    downloadFile({
      url: getFileUrl(message.text ?? ""),
      type: message.type,
      createdAt: new Date(message.createdAt),
    });
  }
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="max-w-xs">
    {#if documentInfo}
      <button
        on:click={handleDownloadDocument}
        class={`text-left flex items-center gap-2 p-2 rounded-md mb-0.5 pr-5
          ${isOwn ? "bg-cyan-800 text-white" : "bg-zinc-100"}
        `}
      >
        <img
          src={isOwn ? "/icons/document-light.svg" : "/icons/document.svg"}
          alt="Document icon"
          class="w-8 h-8"
        />
        <div>
          <p class="font-medium break-all">{documentInfo.name}</p>
          <p class="text-xs">
            {#if documentInfo.extension}
              {documentInfo.extension.toUpperCase()} ·
            {/if}
            {formatFileSize(documentInfo.size)}
          </p>
        </div>
      </button>
    {/if}

    <MessageStatus {message} {lastReadAt} {isOwn} />
  </div>
</MessageBubble>
