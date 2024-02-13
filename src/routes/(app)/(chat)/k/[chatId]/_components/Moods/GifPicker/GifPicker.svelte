<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { isOpen } from "../store";
  import { replyingTo } from "$lib/stores/store";
  import { encryptMessageField } from "$lib/utils/encryption";
  import { sendMessage } from "$lib/socket/client";
  import SearchGifs from "./SearchGifs.svelte";
  import GifsSkeleton from "./GifsSkeleton.svelte";
  import GifList from "./GifList.svelte";

  let search = "";

  const sendGif = trpc.message.sendGif.createMutation({
    onSuccess: () => {
      $replyingTo = null;
      $isOpen = false;
    },
  });

  const getTrendingGifs = trpc.mood.gif.getTrending.createQuery();

  $: searchGifs = trpc.mood.gif.search.createQuery(search, {
    enabled: !!search,
  });

  async function handleSendGif(gif: string) {
    const encryptedGif = await encryptMessageField(gif, $page.params.chatId);

    const newMessage = await $sendGif.mutateAsync({
      gif: encryptedGif,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
    });

    sendMessage({
      ...newMessage,
      createdAt: new Date(newMessage.createdAt),
      imageInfo: null,
      videoInfo: null,
      linkPreview: null,
      documentInfo: null,
      audioInfo: null
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
