<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { isOpen } from "../store";
  import { replyingTo } from "$lib/stores/store";
  import { encryptMessageField } from "$lib/utils/encryption";
  import SearchStickers from "./SearchStickers.svelte";
  import StickersSkeleton from "./StickersSkeleton.svelte";
  import StickerList from "./StickerList.svelte";

  let search = "";

  const sendSticker = trpc.message.sendSticker.createMutation({
    onSuccess: () => {
      $replyingTo = null;
      $isOpen = false;
    },
  });

  const getTrendingStickers = trpc.mood.sticker.getTrending.createQuery();

  $: searchStickers = trpc.mood.sticker.search.createQuery(search, {
    enabled: !!search,
  });

  async function handleSendSticker(sticker: string) {
    const encryptedSticker = await encryptMessageField(
      sticker,
      $page.params.chatId,
    );

    $sendSticker.mutate({
      sticker: encryptedSticker,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
    });
  }

  function handleSearchStickers(query: string) {
    search = query;
    $searchStickers.refetch();
  }
</script>

<SearchStickers onSearch={handleSearchStickers} />

<div class="overflow-auto p-2 h-96">
  {#if search && $searchStickers.data}
    {#if $searchStickers.data.length}
      <StickerList stickers={$searchStickers.data} onPick={handleSendSticker} />
    {:else}
      <p class="text-sm font-medium text-zinc-500">No stickers found.</p>
    {/if}
  {:else if $getTrendingStickers.isLoading}
    <StickersSkeleton />
  {:else}
    <StickerList
      stickers={$getTrendingStickers.data}
      onPick={handleSendSticker}
    />
  {/if}
</div>
