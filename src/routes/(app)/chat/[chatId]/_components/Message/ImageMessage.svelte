<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import { getFileUrl } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";
  import Image from "$lib/ui/Image.svelte";
  import ExpandedImage from "$lib/ui/ExpandedImage.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let brokenFile = false;

  let isExpanded = false;

  function handleExpand() {
    if (brokenFile) return;
    isExpanded = true;
  }

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);
</script>

<div
  role="button"
  tabindex="0"
  on:click={handleExpand}
  on:keydown={(e) => e.key === "Enter" && (isExpanded = true)}
  class="overflow-hidden relative rounded-md"
>
  <div
    class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t to-transparent from-black/40"
  />
  {#if message.text}
    <Image
      src={getFileUrl(message.text)}
      alt="Image sent by {message.senderId}"
      class="object-contain max-w-xs max-h-80 bg-zinc-100"
      draggable={false}
      bind:brokenFile
    />
  {/if}
  <p
    class="flex absolute right-1 bottom-1 gap-0.5 items-end leading-3 text-right text-white text-[10px] min-w-fit"
  >
    {formatTime(createdAt)}
    {#if isOwn}
      {#if isRead}
        <img
          src="/icons/double-check.svg"
          alt="Read"
          title="Read"
          class="-mb-0.5 w-4 h-4"
        />
      {:else}
        <img
          src="/icons/check.svg"
          alt="Sent"
          title="Sent"
          class="-mb-0.5 w-4 h-4"
        />
      {/if}
    {/if}
  </p>
</div>

{#if isExpanded}
  <ExpandedImage bind:expanded={isExpanded}>
    {#if message.text}
      <Image
        src={getFileUrl(message.text)}
        alt="Image sent by {message.senderId}"
        class="object-contain w-full h-full"
        draggable={false}
      />
    {/if}
  </ExpandedImage>
{/if}
