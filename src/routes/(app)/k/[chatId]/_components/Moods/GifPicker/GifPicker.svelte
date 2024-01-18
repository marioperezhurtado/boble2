<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { isOpen } from "../store";
  import { replyingTo } from "$lib/stores/store";
  import SearchGifs from "./SearchGifs.svelte";
  import GifList from "./GifList.svelte";

  let search = ""

  const sendGif = trpc($page).message.sendGif.createMutation({
    retry: false,
    onSuccess() {
      $replyingTo = null;
      $isOpen = false;
    },
  });

  const getTrendingGifs = trpc($page).mood.gif.getTrending.createQuery();

  $: searchGifs = trpc($page).mood.gif.search.createQuery(search, {
    enabled: !!search,
  });

  function handleSendGif(gif: string) {
    $sendGif.mutate({
      gif,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
    });
  }

  function handleSearchGifs(query: string) {
    search = query;
    $searchGifs.refetch();
  }
</script>

<SearchGifs onSearch={handleSearchGifs} />

<div class="overflow-auto p-2 h-96">
  {#if search && $searchGifs.data}
    {#if $searchGifs.data.length}
      <GifList gifs={$searchGifs.data} onPick={handleSendGif} />
    {:else}
      <p class="font-medium text-zinc-500 text-sm">No GIFs found.</p>
    {/if}
  {:else if $getTrendingGifs.isLoading}
    <p class="font-medium text-zinc-500 text-sm">Loading...</p>
  {:else}
    <GifList gifs={$getTrendingGifs.data} onPick={handleSendGif} />
  {/if}
</div>
