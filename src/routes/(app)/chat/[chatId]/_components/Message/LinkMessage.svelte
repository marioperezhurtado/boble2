<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import type { Message } from "$lib/db/message/getMessages";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);
  const linkPreview = message.linkPreview;
</script>

<div class="flex-col gap-2 max-w-xs">
  {#if linkPreview}
    <a
      href={linkPreview.url}
      target="_blank"
      rel="noopener noreferrer"
      class={`block rounded-md mb-1 ${isOwn ? "bg-cyan-800" : "bg-zinc-100"}`}
    >
      {#if linkPreview.image}
        <img
          src={linkPreview.image}
          alt={linkPreview.title}
          class="rounded-t-md aspect-video object-cover bg-zinc-100"
          width="320"
          height="180"
        />
      {/if}
      <h3 class="p-2 pb-0 text-sm font-medium">{linkPreview.title}</h3>
      {#if linkPreview.description}
        <p class="p-2 text-xs">{linkPreview.description}</p>
      {/if}
    </a>
  {/if}

  <div class="flex flex-wrap justify-between items-end">
    <a
      href={message.text}
      target="_blank"
      rel="noopener noreferrer"
      class="px-1"
    >
      <img
        src={isOwn ? "/icons/link-light.svg" : "/icons/link.svg"}
        alt="Link"
        class="inline -mt-0.5 w-3.5 h-3.5"
      />
      <span class="underline break-all">{message.text}</span>
    </a>

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
</div>
