<script lang="ts">
  import { formatDateShort } from "$lib/utils/date";
  import type { RouterOutputs } from "$lib/trpc/server/trpc";
  import Image from "$lib/ui/Image.svelte";

  type Message = RouterOutputs["message"]["getMediaMessages"][number];

  export let messages: Message[];
</script>

<ul class="flex flex-col gap-4 py-4 px-3">
  {#each messages as message}
    <li>
      {#if !message.linkPreview}
        <a
          href={message.source}
          target="_blank"
          rel="noopener noreferrer"
          class="block -mt-1 text-sm font-medium text-cyan-700 underline"
        >
          {message.source}
        </a>
      {:else}
        <div class="flex gap-2 pb-1">
          <Image
            src={message.linkPreview.image ?? ""}
            alt={message.linkPreview.title ?? ""}
            class="object-cover w-14 rounded-md min-w-14 aspect-square"
          />
          <div class="text-xs">
            <h2 class="font-semibold">
              {message.linkPreview.title}
            </h2>
            <p class="pt-1 text-zinc-600">{message.linkPreview.description}</p>
            <a
              href={message.source}
              target="_blank"
              rel="noopener noreferrer"
              class="block pt-1 text-xs font-medium text-cyan-700 underline"
            >
              {message.source}
            </a>
          </div>
        </div>
      {/if}
      <p class="text-xs text-right">
        {formatDateShort(new Date(message.createdAt))}
      </p>
    </li>
  {/each}
</ul>
