<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import { generateLinkPreview } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);
</script>

<div class="flex-col gap-2 p-1 max-w-xs">
  {#await generateLinkPreview(message.text ?? "") then preview}
    {#if preview}
      <a
        href={message.text}
        target="_blank"
        rel="noopener noreferrer"
        class={`block rounded-md mb-1 ${isOwn ? "bg-cyan-800" : "bg-zinc-100"}`}
      >
        <img src={preview.image} alt={preview.title} class="rounded-t-md" />
        <h3 class="p-2 pb-0 text-sm font-medium">{preview.title}</h3>
        {#if preview.description}
          <p class="p-2 text-xs">{preview.description}</p>
        {/if}
      </a>
    {/if}
  {/await}

  <div class="p-1">
    <a href={message.text} target="_blank" rel="noopener noreferrer">
      <img
        src={isOwn ? "/icons/link-light.svg" : "/icons/link.svg"}
        alt="Link"
        class="inline -mt-0.5 w-3.5 h-3.5"
      />
      <span class="underline break-all">{message.text}</span>
    </a>

    <p
      class={`leading-3 text-right text-[10px] flex min-w-fit gap-0.5 items-end
      justify-end pt-1
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
</div>
