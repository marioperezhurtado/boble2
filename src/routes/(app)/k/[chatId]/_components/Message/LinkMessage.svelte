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
      <a
        href={message.source}
        target="_blank"
        rel="noopener noreferrer"
        class={`block rounded-md mb-1 ${isOwn ? "bg-cyan-800" : "bg-zinc-100"}`}
      >
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
      </a>
    {/if}

    <div class="flex flex-wrap justify-between items-end">
      {#if message.text}
        <p class="break-all">
          {#each message.text.split(" ") as word}
            {#if word.match(/^https?:\/\/\S+$/)}
              <a
                href={word}
                target="_blank"
                rel="noopener noreferrer"
                class="underline"
              >
              {word}{" "}
              </a>
            {:else}
              {word}{" "}
            {/if}
          {/each}
        </p>
      {/if}

      <MessageStatus {message} {lastReadAt} {isOwn} />
    </div>
  </div>
</MessageBubble>
