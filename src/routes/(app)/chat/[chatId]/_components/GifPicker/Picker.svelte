<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import type { PageData, ActionData } from "../../$types";
  import SearchGifs from "./SearchGifs.svelte";
  import GifList from "./GifList.svelte";

  export let onPick: (gif: string) => void;

  $: data = $page.data as PageData;
  $: searchData = $page.form as ActionData;
</script>

<div
  in:fly={{ y: 30, duration: 150 }}
  class="absolute bottom-12 z-20 flex-1 w-96 bg-white rounded-md border shadow-md"
>
  <SearchGifs />

  <div class="overflow-auto p-2 h-96">
    {#if searchData?.gifResults}
      <GifList gifs={searchData.gifResults} {onPick} />
    {:else}
      {#await data.streamed.trendingGifs}
        <p>Loading...</p>
      {:then trendingGifs}
        <GifList gifs={trendingGifs} {onPick} />
      {/await}
    {/if}
  </div>
</div>
