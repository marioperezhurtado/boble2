<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import { EMOJI_CATEGORIES } from "./categories";
  import { capitalize } from "$lib/utils/text";
  import { hoveredEmoji, parseUnicodeEmoji, type EmojiData } from "./store";
  import { text } from "$lib/stores/store";
  import EmojisSkeleton from "./EmojisSkeleton.svelte";
  import Category from "./Category.svelte";
  import FilterEmojis from "./FilterEmojis.svelte";

  const getEmojis = trpc.mood.emoji.getAll.createQuery();

  let filteredEmojis: EmojiData | null = null;

  function handlePick(emoji: string) {
    $text += parseUnicodeEmoji(emoji);
  }

  function scrollToCategory(category: string) {
    const categoryElement = document.getElementById(category);
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<FilterEmojis initialEmojis={$getEmojis.data ?? null} bind:filteredEmojis />

<div class="flex justify-around items-center px-2 pt-1 border-b">
  {#each EMOJI_CATEGORIES as category}
    <button
      on:click={() => scrollToCategory(category.slug)}
      aria-label={category.title}
      title={category.title}
      type="button"
      class="p-1.5 border-b-2 border-transparent"
    >
      <img src={category.icon} alt={category.title} class="w-4 h-4" />
    </button>
  {/each}
</div>

<section id="emoji-list" class="overflow-y-scroll h-96">
  {#if $getEmojis.isLoading}
    <EmojisSkeleton />
  {:else if $getEmojis.data}
    {#each EMOJI_CATEGORIES as category}
      <Category
        {category}
        emojis={filteredEmojis ?? $getEmojis.data}
        onPick={handlePick}
      />
    {/each}
  {/if}
</section>

{#if $hoveredEmoji}
  <div class="flex gap-2.5 items-center p-2 border-t">
    <p class="p-0.5 text-2xl">
      {parseUnicodeEmoji($hoveredEmoji.u)}
    </p>
    <p class="text-sm font-medium">
      {capitalize($hoveredEmoji.n[0])}
    </p>
  </div>
{/if}
