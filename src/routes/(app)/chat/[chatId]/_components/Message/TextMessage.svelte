<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import type { Message } from "$lib/db/message/getMessages";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);
</script>

<div class="flex gap-x-2 items-end pt-1.5 pr-1 pb-1 pl-2.5">
  <p class="break-all">{message.text}

  </p>

  <p
    class={`leading-3 text-right text-[10px] flex min-w-fit gap-0.5 items-end
        ${isOwn ? "text-white" : "text-zinc-600"}`}
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
