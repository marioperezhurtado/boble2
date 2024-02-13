<script lang="ts">
  import { fly } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";
  import { isOpen, selectedMood } from "./store";
  import { hoveredEmoji } from "./EmojiPicker/store";
  import EmojiPicker from "./EmojiPicker/EmojiPicker.svelte";
  import GifPicker from "./GifPicker/GifPicker.svelte";
  import StickerPicker from "./StickerPicker/StickerPicker.svelte";
  import Mood from "./Mood.svelte";

  function handleClose() {
    $hoveredEmoji = null;
    $isOpen = false;
  }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && handleClose()} />

<div
  use:clickOutside={handleClose}
  class="flex relative items-center min-w-fit"
>
  <button
    on:click={() => ($isOpen = !$isOpen)}
    type="button"
    title="Moods"
    aria-label="Moods"
    class="p-0.5 rounded-md focus:outline-cyan-600"
  >
    <img src="/icons/emoji.svg" alt="Moods" class="w-7 h-7"/>
  </button>

  {#if $isOpen}
    <div
      transition:fly={{ y: 30, duration: 150 }}
      class="absolute -left-2.5 z-20 w-screen bg-white rounded-md rounded-b-none border shadow-none sm:left-0 sm:bottom-12 sm:w-96 sm:rounded-b sm:shadow-md bottom-[42px]"
    >
      {#if $selectedMood === "Emoji"}
        <EmojiPicker />
      {:else if $selectedMood === "GIF"}
        <GifPicker />
      {:else if $selectedMood === "Sticker"}
        <StickerPicker />
      {/if}

      <div class="p-2 border-t">
        <ul
          class="flex overflow-hidden items-center mx-auto text-xs rounded-full border w-fit"
        >
          <Mood mood="Emoji" icon="/icons/emoji.svg" />
          <Mood mood="GIF" icon="/icons/gif-outline.svg" />
          <Mood mood="Sticker" icon="/icons/sticker-outline.svg" />
        </ul>
      </div>
    </div>
  {/if}
</div>
