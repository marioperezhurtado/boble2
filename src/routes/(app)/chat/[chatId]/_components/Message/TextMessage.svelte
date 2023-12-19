<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import type { Message } from "$lib/db/message/getMessages";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);
</script>

<div class="flex flex-wrap justify-between items-end">
  <p class="break-all px-1">{message.text}</p>
  <p
    class="flex gap-0.5 ml-auto pl-0.5 items-end leading-3 text-right text-[10px] min-w-fit"
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
