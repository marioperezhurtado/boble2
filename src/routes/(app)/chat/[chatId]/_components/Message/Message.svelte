<script lang="ts">
  import { page } from "$app/stores";
  import { formatDate } from "$lib/utils/date";
  import { isValidUrl } from "$lib/utils/url";
  import { longPress } from "$lib/actions/longPress";
  import { messages } from "../stores";
  import type { PageData } from "../../$types";
  import type { Message } from "$lib/db/message/getMessages";
  import TextMessage from "./TextMessage.svelte";
  import ImageMessage from "./ImageMessage.svelte";
  import GifMessage from "./GifMessage.svelte";
  import LinkMessage from "./LinkMessage.svelte";
  import MessageActions from "./MessageActions.svelte";

  export let message: Message;
  export let prevMessage: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  $: data = $page.data as PageData;
  $: replyTo = $messages.find((m) => m.id === message.replyToId);

  const prevDate = new Date(prevMessage?.createdAt!);
  const currentDate = new Date(message.createdAt!);
  const firstOfDate = prevDate.getDate() !== currentDate.getDate();
  const isFirst = prevMessage?.senderId !== message.senderId || firstOfDate;
  const createdAt = new Date(message.createdAt!);

  let actionsOpen = false;
</script>

{#if firstOfDate && message.createdAt}
  <span
    class="sticky top-3 z-10 py-1 mx-auto mt-3 w-20 text-xs text-center bg-white rounded-md shadow-sm"
  >
    {formatDate(createdAt)}
  </span>
{/if}
<li
  class={`relative rounded-md shadow-sm sm:max-w-[80%] p-1 md:max-w-full
  lg:max-w-[80%] select-none md:select-auto
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
      <div
        class={`px-2.5 py-1.5 mb-1 rounded text-xs border-l-4
      ${isOwn ? "bg-cyan-800 text-zinc-100" : "bg-zinc-100 border-zinc-300"}`}
      >
        {#if replyTo}
          <p class="font-semibold">
            {#if replyTo.senderId === data.chat.user.id}
              {data.chat.user.alias || data.chat.user.name}
            {:else}
              You
            {/if}
          </p>
          <p>{replyTo.text}</p>
        {:else}
          <p>Original message was deleted</p>
        {/if}
      </div>
    {/if}

    {#if message.type === "image"}
      <ImageMessage {message} {lastReadAt} {isOwn} />
    {:else if message.type === "gif"}
      <GifMessage {message} {lastReadAt} {isOwn} />
    {:else if isValidUrl(message.text ?? "")}
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
    <MessageActions bind:isOpen={actionsOpen} {message} {isOwn} />
  {/if}
</li>
