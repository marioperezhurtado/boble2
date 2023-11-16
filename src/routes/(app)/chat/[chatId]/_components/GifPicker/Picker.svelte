<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import SearchGifs from "./SearchGifs.svelte";
  import type { PageData } from "../../$types";

  export let onPick: (gif: string) => void;

  const NUM_COLUMNS = 2;

  $: data = $page.data as PageData;
</script>

<div
  in:fly={{ y: 30, duration: 150 }}
  class="absolute bottom-12 z-20 flex-1 w-96 bg-white rounded-md border shadow-md"
>
  <SearchGifs />

  <div
    class="grid overflow-auto gap-2 p-2 h-96"
    style={`grid-template-columns: repeat(${NUM_COLUMNS}, 1fr)`}
  >
    {#await data.streamed.trendingGifs}
      <p>Loading...</p>
    {:then trendingGifs}
      {#each { length: NUM_COLUMNS } as _, column}
        <ul class="flex flex-col gap-2">
          {#each trendingGifs as gif, i}
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
                    class="w-full h-full"
                  />
                </button>
              </li>
            {/if}
          {/each}
        </ul>
      {/each}
    {/await}
  </div>
</div>
