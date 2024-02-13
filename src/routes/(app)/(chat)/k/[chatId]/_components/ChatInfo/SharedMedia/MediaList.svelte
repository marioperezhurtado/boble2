<script lang="ts">
  import { getFileUrl } from "$lib/utils/url";
  import type { RouterOutputs } from "$lib/trpc/shared";
  import Image from "$lib/ui/Image.svelte";

  type Message = RouterOutputs["message"]["getMediaMessages"][number];

  export let messages: Message[];
</script>

<ul class="grid grid-cols-3 gap-1 p-1">
  {#each messages as message}
    <li class="overflow-hidden relative bg-white rounded border shadow-sm">
      {#if message.type === "image"}
        <Image
          src={getFileUrl(message.source ?? "")}
          alt="sent in chat"
          class="object-cover aspect-square !rounded"
        />
      {:else if message.type === "video"}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video
          src={getFileUrl(message.source ?? "")}
          class="object-cover aspect-square"
          playsinline
          muted
        />
        <div class="absolute bottom-1 left-1 py-1 px-1.5 rounded bg-black/50">
          <img src="/icons/video-light.svg" alt="video" class="w-3.5 h-3.5" />
        </div>
      {/if}
    </li>
  {/each}
</ul>
