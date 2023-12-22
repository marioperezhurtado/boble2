<script lang="ts">
  import { fly } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";
  import { isOpen, selectedMood } from "./store";
  import EmojiPicker from "./EmojiPicker/EmojiPicker.svelte";
  import GifPicker from "./GifPicker/GifPicker.svelte";
  import Mood from "./Mood.svelte";
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && ($isOpen = false)} />

<div
  use:clickOutside={() => ($isOpen = false)}
  class="flex relative items-center min-w-fit"
>
  <button
    on:click={() => ($isOpen = !$isOpen)}
    type="button"
    title="Moods"
    aria-label="Moods"
    class="p-0.5 rounded-md focus:outline-cyan-600"
  >
    <img src="/icons/emoji.svg" alt="Moods" class="w-7 h-7" />
  </button>

  {#if $isOpen}
    <div
      transition:fly={{ y: 30, duration: 150 }}
      class="absolute bottom-12 z-20 w-96 bg-white rounded-md border shadow-md"
    >
      {#if $selectedMood === "Emoji"}
        <EmojiPicker onPick={() => {}} />
      {:else if $selectedMood === "GIF"}
        <GifPicker />
      {:else if $selectedMood === "Sticker"}
        <p>TODO: Sticker picker</p>
      {/if}

      <div class="p-2 border-t">
        <ul
          class="flex overflow-hidden items-center mx-auto text-xs rounded-full border w-fit"
        >
          <Mood mood="Emoji" icon="/icons/emoji.svg" />
          <Mood mood="GIF" icon="/icons/gif-outline.svg" />
          <Mood mood="Sticker" icon="/icons/sticker.svg" />
        </ul>
      </div>
    </div>
  {/if}
</div>
