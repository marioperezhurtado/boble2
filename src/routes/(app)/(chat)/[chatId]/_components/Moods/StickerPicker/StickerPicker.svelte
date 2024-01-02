<script lang="ts">
  import { page } from "$app/stores";
  import { isOpen } from "../store";
  import { replyingTo } from "../../stores";
  import type { PageData, ActionData } from "../../../$types";
  import SearchStickers from "./SearchStickers.svelte";
  import StickerList from "./StickerList.svelte";

  async function handlePickSticker(sticker: string) {
    const formData = new FormData();
    formData.append("sticker", sticker);
    formData.append("replyToId", $replyingTo?.id ?? "");

    await fetch("?/sendSticker", {
      method: "POST",
      body: formData,
    });

    $replyingTo = null;
    $isOpen = false;
  }

  $: data = $page.data as PageData;
  $: searchData = $page.form as ActionData;
</script>

<SearchStickers />

<div class="overflow-auto p-2 h-96">
  {#if searchData?.stickerResults}
    <StickerList
      stickers={searchData.stickerResults}
      onPick={handlePickSticker}
    />
  {:else}
    {#await data.trendingStickers}
      <p>Loading...</p>
    {:then trendingStickers}
      <StickerList stickers={trendingStickers} onPick={handlePickSticker} />
    {/await}
  {/if}
</div>
