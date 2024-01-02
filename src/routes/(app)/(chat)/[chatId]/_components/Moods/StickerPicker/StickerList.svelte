<script lang="ts">
  import type { Sticker } from "$lib/mood/types";

  export let onPick: (url: string) => void;
  export let stickers: Sticker[] = [];

  const NUM_COLUMNS = 4;
</script>

<div
  class="grid gap-2"
  style="grid-template-columns: repeat({NUM_COLUMNS}, 1fr)"
>
  {#each { length: NUM_COLUMNS } as _, column}
    <ul class="flex flex-col gap-2">
      {#each stickers as sticker, i}
        {#if i % NUM_COLUMNS === column}
          <li>
            <button
              on:click={() => onPick(sticker.images.downsized.url)}
              type="button"
              class="overflow-hidden w-full h-full rounded-md hover:outline-cyan-600"
            >
              <img
                src={sticker.images.downsized.url}
                alt={sticker.title}
                class="w-full h-full"
                style="aspect-ratio: {sticker.images.downsized.width} / {sticker.images
                  .downsized.height}"
              />
            </button>
          </li>
        {/if}
      {/each}
    </ul>
  {/each}
</div>
