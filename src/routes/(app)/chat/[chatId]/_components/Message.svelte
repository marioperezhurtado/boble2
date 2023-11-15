<script lang="ts">
  import { formatDate } from "$lib/utils/date";
  import { isImage } from "$lib/utils/messageType";
  import TextMessage from "./TextMessage.svelte";
  import ImageMessage from "./ImageMessage.svelte";
  import type { Message } from "$lib/db/message/getMessages";

  export let message: Message;
  export let prevMessage: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const prevDate = new Date(prevMessage?.createdAt!);
  const currentDate = new Date(message.createdAt!);
  const firstOfDate = prevDate.getDate() !== currentDate.getDate();
  const isFirst = prevMessage?.senderId !== message.senderId || firstOfDate;
  const createdAt = new Date(message.createdAt!);
</script>

{#if firstOfDate && message.createdAt}
  <span
    class="sticky top-3 z-10 py-1 mx-auto mt-3 w-20 text-xs text-center bg-white rounded-md shadow-sm"
  >
    {formatDate(createdAt)}
  </span>
{/if}
<li
  class={`relative rounded-md shadow-sm sm:max-w-[80%] md:max-w-full lg:max-w-[80%] 
      ${isOwn ? "self-end bg-cyan-700 text-white" : "self-start bg-white"}
      ${isFirst ? (isOwn ? "rounded-tr-none" : "rounded-tl-none") : ""}
      ${isFirst ? "mt-3" : "mt-1"}`}
>
  {#if isImage(message.text ?? "")}
    <ImageMessage {message} {lastReadAt} {isOwn} />
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
</li>
