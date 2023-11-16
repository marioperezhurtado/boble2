<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import type { Message } from "$lib/db/message/getMessages";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);
</script>

<div class="p-1 max-w-[18rem]">
  <div class="overflow-hidden relative rounded-md">
    <div
      class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t to-transparent from-black/40"
    />
    <img src={message.text} alt={`Image sent by ${message.senderId}`} />
    <p
      class="absolute bottom-1 right-1 leading-3 text-right text-[10px] flex min-w-fit gap-0.5 items-end text-white"
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
