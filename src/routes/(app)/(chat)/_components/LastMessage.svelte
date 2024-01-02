<script lang="ts">
  import { chats } from "$lib/stores/chats";

  export let chat: (typeof $chats)[number];

  $: isLastMessageOwn = chat.lastMessage?.senderId !== chat.user.id;
  $: lastReadAt = chat.user.lastReadAt ?? chat.createdAt;
  $: isLastMessageRead = chat.lastMessage?.createdAt! <= lastReadAt!;
</script>

{#if !chat.lastMessage?.id}
  <span></span>
{:else if chat.lastMessage?.deleted}
  <p class="flex gap-0.5 items-center text-sm text-zinc-500">
    <img
      src="/icons/cancel.svg"
      alt="Deleted"
      title="Deleted"
      class="w-3.5 h-3.5"
    />
    <span class="italic" title="This message was deleted">
      This message was deleted
    </span>
  </p>
{:else}
  <p class="flex gap-0.5 items-center text-sm text-zinc-500">
    {#if isLastMessageOwn}
      {#if isLastMessageRead}
        <img
          src="/icons/double-check-dark.svg"
          alt="Read"
          title="Read"
          class="-mb-0.5 w-4 h-4"
        />
      {:else}
        <img
          src="/icons/check-dark.svg"
          alt="Sent"
          title="Sent"
          class="-mb-0.5 w-4 h-4"
        />
      {/if}
    {/if}
    {#if chat.lastMessage.type === "image"}
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img
        src="/icons/camera.svg"
        alt="Photo icon"
        class="mr-0.5 w-3.5 h-3.5"
      />
      <span
        class="line-clamp-1 overflow-ellipsis"
        title={chat.lastMessage.text ?? ""}
      >
        {chat.lastMessage.text || "Photo"}
      </span>
    {:else if chat.lastMessage.type === "video"}
      <img src="/icons/video.svg" alt="Video icon" class="mr-0.5 w-4 h-4" />
      <span
        class="line-clamp-1 overflow-ellipsis"
        title={chat.lastMessage.text ?? ""}
      >
        {chat.lastMessage.text || "Video"}
      </span>
    {:else if chat.lastMessage.type === "audio"}
      <img
        src="/icons/microphone.svg"
        alt="Audio icon"
        class="mr-0.5 w-4 h-4"
      />
      <span>Voice message</span>
    {:else if chat.lastMessage.type === "document"}
      <img
        src="/icons/document.svg"
        alt="Document icon"
        class="mr-0.5 w-4 h-4"
      />
      <span class="line-clamp-1 overflow-ellipsis">
        {chat.lastMessage.text || chat.documentName || "Document"}
      </span>
    {:else if chat.lastMessage.type === "gif"}
      <img src="/icons/gif.svg" alt="GIF icon" class="mr-0.5 w-4 h-4" />
      <span>GIF</span>
    {:else if chat.lastMessage.type === "sticker"}
      <img src="/icons/sticker.svg" alt="Sticker icon" class="mr-0.5 w-4 h-4" />
      <span>Sticker</span>
    {:else if chat.lastMessage.type === "link"}
      <img src="/icons/link.svg" alt="Link icon" class="mr-0.5 w-4 h-4" />
      <span
        class="line-clamp-1 overflow-ellipsis"
        title={chat.lastMessage.text ?? ""}
      >
        {chat.lastMessage.text}
      </span>
    {:else}
      <span
        class="line-clamp-1 overflow-ellipsis"
        title={chat.lastMessage.text ?? ""}
      >
        {chat.lastMessage.text}
      </span>
    {/if}
  </p>
{/if}
