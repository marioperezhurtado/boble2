<script lang="ts">
  import { formatDate } from "$lib/utils/date";
  import { longPress } from "$lib/actions/longPress";
  import type { Message } from "$lib/db/message/getMessages";
  import TextMessage from "./TextMessage.svelte";
  import ImageMessage from "./ImageMessage.svelte";
  import VideoMessage from "./VideoMessage.svelte";
  import GifMessage from "./GifMessage.svelte";
  import StickerMessage from "./StickerMessage.svelte";
  import LinkMessage from "./LinkMessage.svelte";
  import MessageActions from "./MessageActions.svelte";

  export let message: Message;
  export let prevMessage: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const prevDate = new Date(prevMessage?.createdAt!);
  const currentDate = new Date(message.createdAt!);
  const firstOfDate = prevDate.getDate() !== currentDate.getDate();
  const isFirst = prevMessage?.senderId !== message.senderId || firstOfDate;
  const createdAt = new Date(message.createdAt!);

  let actionsOpen = false;
  let brokenFile = false;
</script>

{#if firstOfDate && message.createdAt}
  <span
    class="sticky top-3 z-10 py-1 mx-auto mt-3 w-20 text-xs text-center bg-white rounded-md shadow-sm"
  >
    {formatDate(createdAt)}
  </span>
{/if}

<li
  id={message.id}
  class={`relative select-none md:select-auto
      ${isOwn ? "self-end text-white" : "self-start"}
      ${isFirst ? "mt-3" : "mt-1"}`}
>
  <button
    on:contextmenu|preventDefault={() => (actionsOpen = true)}
    use:longPress={() => (actionsOpen = true)}
    class="block text-left"
  >
    {#if message.type === "image"}
      <ImageMessage {message} {lastReadAt} {isOwn} {isFirst} bind:brokenFile />
    {:else if message.type === "video"}
      <VideoMessage {message} {lastReadAt} {isOwn} {isFirst} />
    {:else if message.type === "gif"}
      <GifMessage {message} {lastReadAt} {isOwn} {isFirst} bind:brokenFile />
    {:else if message.type === "sticker"}
      <StickerMessage {message} {lastReadAt} {isOwn} bind:brokenFile />
    {:else if message.type === "link"}
      <LinkMessage {message} {lastReadAt} {isOwn} {isFirst} />
    {:else}
      <TextMessage {message} {lastReadAt} {isOwn} {isFirst} />
    {/if}

    {#if actionsOpen}
      <MessageActions
        bind:isOpen={actionsOpen}
        {message}
        {isOwn}
        {brokenFile}
      />
    {/if}
  </button>
</li>
