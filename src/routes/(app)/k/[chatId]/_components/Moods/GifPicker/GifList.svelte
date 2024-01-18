<script lang="ts">
  import type { RouterOutputs } from "$lib/trpc/trpc";

  type Gif = RouterOutputs["mood"]["gif"]["getTrending"][number];

  export let onPick: (url: string) => void;
  export let gifs: Gif[] = [];

  const NUM_COLUMNS = 2;
</script>

<div
  class="grid gap-2"
  style="grid-template-columns: repeat({NUM_COLUMNS}, 1fr)"
>
  {#each { length: NUM_COLUMNS } as _, column}
    <ul class="flex flex-col gap-2">
      {#each gifs as gif, i}
        {#if i % NUM_COLUMNS === column}
          <li>
            <button
              on:click={() => onPick(gif.images.downsized_small.mp4)}
              type="button"
              class="overflow-hidden w-full h-full rounded-md border shadow-sm hover:outline-cyan-600"
            >
              <img
                src={gif.images.downsized.url}
                alt={gif.title}
                class="w-full h-full bg-zinc-50"
                style="aspect-ratio: {gif.images.downsized.width} / {gif.images
                  .downsized.height}"
              />
            </button>
          </li>
        {/if}
      {/each}
    </ul>
  {/each}
</div>
