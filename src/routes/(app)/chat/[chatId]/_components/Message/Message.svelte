<script lang="ts">
  import { formatDate } from "$lib/utils/date";
  import { longPress } from "$lib/actions/longPress";
  import { messages } from "../stores";
  import type { Message } from "$lib/db/message/getMessages";
  import TextMessage from "./TextMessage.svelte";
  import ImageMessage from "./ImageMessage.svelte";
  import GifMessage from "./GifMessage.svelte";
  import LinkMessage from "./LinkMessage.svelte";
  import MessageActions from "./MessageActions.svelte";
  import ReplyTo from "./ReplyTo.svelte";

  export let message: Message;
  export let prevMessage: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  $: replyTo = $messages.find((m) => m.id === message.replyToId);

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
  class={`relative rounded-md shadow-sm sm:max-w-[80%] p-1 md:max-w-full
  lg:max-w-[60%] select-none md:select-auto
      ${isOwn ? "self-end bg-cyan-700 text-white" : "self-start bg-white"}
      ${isFirst ? (isOwn ? "rounded-tr-none" : "rounded-tl-none") : ""}
      ${isFirst ? "mt-3" : "mt-1"}`}
>
  <button
    on:contextmenu|preventDefault={() => (actionsOpen = true)}
    use:longPress={() => (actionsOpen = true)}
    class="block text-left"
  >
    {#if message.replyToId}
      <ReplyTo replyTo={replyTo ?? null} {isOwn} />
    {/if}

    {#if message.type === "image"}
      <ImageMessage {message} {lastReadAt} {isOwn} bind:brokenFile />
    {:else if message.type === "gif"}
      <GifMessage {message} {lastReadAt} {isOwn} bind:brokenFile />
    {:else if message.type === "link"}
      <LinkMessage {message} {lastReadAt} {isOwn} />
    {:else}
      <TextMessage {message} {lastReadAt} {isOwn} />
    {/if}
    {#if isFirst}
      <span
        class={`absolute top-0 w-0 h-0 border-transparent border-t-[10px]
        ${
          isOwn
            ? "border-t-cyan-700 border-r-[5px] -right-1"
            : "border-t-white border-l-[5px] -left-1"
        }
      `}
      />
    {/if}
  </button>

  {#if actionsOpen}
    <MessageActions bind:isOpen={actionsOpen} {message} {isOwn} {brokenFile} />
  {/if}
</li>
