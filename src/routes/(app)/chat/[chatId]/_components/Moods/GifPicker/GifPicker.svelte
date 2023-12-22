<script lang="ts">
  import { page } from "$app/stores";
  import { isOpen } from "../store";
  import { replyingTo } from "../../stores";
  import type { PageData, ActionData } from "../../../$types";
  import SearchGifs from "./SearchGifs.svelte";
  import GifList from "./GifList.svelte";

  async function handlePickGif(gif: string) {
    const formData = new FormData();
    formData.append("gif", gif);
    formData.append("replyToId", $replyingTo?.id ?? "");

    await fetch("?/sendGif", {
      method: "POST",
      body: formData,
    });

    $replyingTo = null;
    $isOpen = false;
  }

  $: data = $page.data as PageData;
  $: searchData = $page.form as ActionData;
</script>

<SearchGifs />

<div class="overflow-auto p-2 h-96">
  {#if searchData?.gifResults}
    <GifList gifs={searchData.gifResults} onPick={handlePickGif} />
  {:else}
    {#await data.streamed.trendingGifs}
      <p>Loading...</p>
    {:then trendingGifs}
      <GifList gifs={trendingGifs} onPick={handlePickGif} />
    {/await}
  {/if}
</div>
