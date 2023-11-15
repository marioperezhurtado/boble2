<script lang="ts">
  import { filteredEmojis, hoveredEmoji, parseUnicodeEmoji } from './store';
	import type { Category } from './categories';

	export let category: Category;
	export let onPick: (emoji: string) => void;
</script>

<h2
	class="sticky top-0 py-2 px-2 text-xs font-bold tracking-wider uppercase bg-white border-b text-zinc-400"
>
	{category.title}
</h2>
{#if $filteredEmojis[category.slug].length > 0}
	<ul id={category.slug} class="grid grid-cols-10 gap-0.5 p-2">
		{#each $filteredEmojis[category.slug] as emoji}
			<li class="flex justify-center items-center">
				<button
					on:click={() => onPick(emoji.u)}
					on:mouseover={() => $hoveredEmoji = emoji}
					on:focus={() => $hoveredEmoji = emoji}
					type="button"
					class="w-7 h-7 text-xl rounded-md hover:bg-zinc-200"
				>
					{parseUnicodeEmoji(emoji.u)}
				</button>
			</li>
		{/each}
	</ul>
{/if}
