<script lang="ts">
  import { page } from "$app/stores";
  import { isOpen } from "../store";
  import { replyingTo } from "../../stores";
  import type { PageData, ActionData } from "../../../$types";
  import SearchStickers from "./SearchStickers.svelte";
  import StickerList from "./StickerList.svelte";
  import { trpc } from "$lib/trpc/client";

  const sendSticker = trpc($page).message.sendSticker.createMutation({
    retry: false,
    onSuccess() {
      $replyingTo = null;
      $isOpen = false;
    },
  });

  function handleSendSticker(sticker: string) {
    $sendSticker.mutate({
      sticker,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
    });
  }

  $: data = $page.data as PageData;
  $: searchData = $page.form as ActionData;
</script>

<SearchStickers />

<div class="overflow-auto p-2 h-96">
  {#if searchData?.stickerResults}
    <StickerList
      stickers={searchData.stickerResults}
      onPick={handleSendSticker}
    />
  {:else}
    {#await data.trendingStickers}
      <p>Loading...</p>
    {:then trendingStickers}
      <StickerList stickers={trendingStickers} onPick={handleSendSticker} />
    {/await}
  {/if}
</div>
