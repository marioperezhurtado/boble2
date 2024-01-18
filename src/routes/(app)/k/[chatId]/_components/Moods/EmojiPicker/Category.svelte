<script lang="ts">
  import { hoveredEmoji, parseUnicodeEmoji, type EmojiData } from './store';
	import type { Category } from './categories';

	export let category: Category;
  export let emojis: EmojiData;
	export let onPick: (emoji: string) => void;
</script>

<h2
	class="sticky top-0 py-2 px-2 text-xs font-bold tracking-wider uppercase bg-white border-b text-zinc-400"
>
	{category.title}
</h2>
{#if emojis[category.slug].length > 0}
	<ul id={category.slug} class="grid grid-cols-9 gap-1.5 p-2">
		{#each emojis[category.slug] as emoji}
			<li class="flex justify-center items-center">
				<button
					on:click={() => onPick(emoji.u)}
					on:mouseover={() => $hoveredEmoji = emoji}
					on:focus={() => $hoveredEmoji = emoji}
					type="button"
					class="w-full text-2xl rounded-md aspect-square hover:bg-zinc-200"
				>
					{parseUnicodeEmoji(emoji.u)}
				</button>
			</li>
		{/each}
	</ul>
{/if}
