<script lang="ts">
	import { fly } from 'svelte/transition';
	import { capitalize } from '$lib/utils/text';
	import { EMOJI_CATEGORIES } from './categories';
	import { hoveredEmoji, parseUnicodeEmoji } from './store';
	import Category from './Category.svelte';
	import FilterEmojis from './FilterEmojis.svelte';

	export let onPick: (emoji: string) => void;

	function handlePick(emoji: string) {
		onPick(parseUnicodeEmoji(emoji));
	}

	function scrollToCategory(category: string) {
		const categoryElement = document.getElementById(category);
		if (categoryElement) {
			categoryElement.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<div
	in:fly={{ y: 30, duration: 150 }}
	class="absolute bottom-12 z-20 w-96 bg-white rounded-md border shadow-md"
>
	<FilterEmojis />
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
		{#each EMOJI_CATEGORIES as category}
			<Category {category} onPick={handlePick} />
		{/each}
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
</div>
