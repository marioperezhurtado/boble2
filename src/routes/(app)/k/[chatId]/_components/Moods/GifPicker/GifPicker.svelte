<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { isOpen } from "../store";
  import { replyingTo } from "../../stores";
  import type { PageData, ActionData } from "../../../$types";
  import SearchGifs from "./SearchGifs.svelte";
  import GifList from "./GifList.svelte";

  const sendGif = trpc($page).message.sendGif.createMutation({
    retry: false,
    onSuccess() {
      $replyingTo = null;
      $isOpen = false;
    },
  });

  function handleSendGif(gif: string) {
    $sendGif.mutate({
      gif,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
    });
  }

  $: data = $page.data as PageData;
  $: searchData = $page.form as ActionData;
</script>

<SearchGifs />

<div class="overflow-auto p-2 h-96">
  {#if searchData?.gifResults}
    <GifList gifs={searchData.gifResults} onPick={handleSendGif} />
  {:else}
    {#await data.trendingGifs}
      <p>Loading...</p>
    {:then trendingGifs}
      <GifList gifs={trendingGifs} onPick={handleSendGif} />
    {/await}
  {/if}
</div>
