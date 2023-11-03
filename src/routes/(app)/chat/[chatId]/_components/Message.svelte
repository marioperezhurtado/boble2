<script lang="ts">
  import { formatDate, formatTime } from "$lib/utils/date";
  import type { Message } from "$lib/db/getMessages";

  export let message: Message;
  export let prevMessage: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const prevDate = new Date(prevMessage?.createdAt!);
  const currentDate = new Date(message.createdAt!);
  const firstOfDate = prevDate.getDate() !== currentDate.getDate();
  const isFirst = prevMessage?.senderId !== message.senderId || firstOfDate;
  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);

</script>

{#if firstOfDate && message.createdAt}
  <span class="sticky top-3 w-20 text-center z-10 py-1 mx-auto mt-2 text-xs bg-white rounded-md shadow-sm">
    {formatDate(createdAt)}
  </span>
{/if}
<li
  class={`relative flex items-end gap-x-2 pt-1.5 pb-1 pl-2.5 pr-1 bg-cyan-700
  rounded-md shadow-sm sm:max-w-[80%] md:max-w-full lg:max-w-[80%] 
      ${isOwn ? "self-end bg-cyan-700 text-white" : "self-start bg-white"}
      ${isFirst ? (isOwn ? "rounded-tr-none" : "rounded-tl-none") : ""}
      ${isFirst ? "mt-3" : "mt-1"}`}
>
  <p class="w-full">{message.text}</p>
  <p
    class={`leading-3 text-right text-[10px] flex min-w-fit gap-0.5 items-end
        ${isOwn ? "text-cyan-100" : "text-zinc-600"}`}
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
