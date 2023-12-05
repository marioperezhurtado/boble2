<script lang="ts">
  import { page } from "$app/stores";
  import { formatTime } from "$lib/utils/date";
  import type { Message } from "$lib/db/message/getMessages";
  import type { PageData } from "../../$types";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  $: data = $page.data as PageData;
  $: replyTo = data.messages.find((m) => m.id === message.replyToId);

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);
</script>

<div class="p-1">
  {#if message.replyToId}
      <div
        class={`px-2.5 py-1.5 mb-2 rounded text-xs border-l-4
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
  <div class="flex gap-x-2 items-end justify-between pl-1.5">
    <p class="break-all">{message.text}</p>
    <p
      class="flex gap-0.5 items-end leading-3 text-right text-[10px] min-w-fit"
      class:text-white={isOwn}
      class:text-zinc-600={!isOwn}
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
</div>
