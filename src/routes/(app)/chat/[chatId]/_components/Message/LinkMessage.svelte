<script lang="ts">
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;

  const linkPreview = message.linkPreview;
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="max-w-xs">
    {#if linkPreview}
      <div class={`rounded-md mb-1 ${isOwn ? "bg-cyan-800" : "bg-zinc-100"}`}>
        {#if linkPreview.image}
          <img
            src={linkPreview.image}
            alt={linkPreview.title}
            class="object-cover rounded-t-md aspect-video bg-zinc-100"
            width="320"
            height="180"
          />
        {/if}
        {#if linkPreview.title}
          <h3 class="p-2 pb-0 text-sm font-medium">{linkPreview.title}</h3>
        {/if}
        {#if linkPreview.description}
          <p class="p-2 text-xs">{linkPreview.description}</p>
        {/if}
      </div>
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

      <MessageStatus {message} {lastReadAt} {isOwn} />
    </div>
  </div>
</MessageBubble>
