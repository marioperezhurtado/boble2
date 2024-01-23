<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { isOpen } from "../store";
  import { replyingTo } from "$lib/stores/store";
  import { encryptMessage } from "$lib/utils/encryption";
  import SearchGifs from "./SearchGifs.svelte";
  import GifsSkeleton from "./GifsSkeleton.svelte";
  import GifList from "./GifList.svelte";

  let search = "";

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

  async function handleSendGif(gif: string) {
    const { text } = await encryptMessage(
      { text: gif, source: null },
      $page.params.chatId,
    );

    $sendGif.mutate({
      gif: text,
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
      <p class="text-sm font-medium text-zinc-500">No GIFs found.</p>
    {/if}
  {:else if $getTrendingGifs.isLoading}
    <GifsSkeleton />
  {:else}
    <GifList gifs={$getTrendingGifs.data} onPick={handleSendGif} />
  {/if}
</div>
