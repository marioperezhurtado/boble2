<script lang="ts">
  import { enhance } from '$app/forms';
	import { capitalize } from '$lib/utils/text';
	import EmojiPicker from './EmojiPicker/EmojiPicker.svelte';

	let text = '';
	let textInput: HTMLInputElement | undefined = undefined;

	function handlePickEmoji(emoji: string) {
		text += emoji;
		textInput?.focus();
	}
</script>

<form
	action="?/sendMessage"
  use:enhance
	method="post"
	class="flex gap-3 items-center p-2 px-3 border-t bg-zinc-50"
>
	<EmojiPicker onPick={handlePickEmoji} />
	<label for="message" class="sr-only">Message</label>
	<input
		value={text}
		on:change={(e) => (text = capitalize(e.currentTarget.value))}
		bind:this={textInput}
		id="message"
		name="message"
		type="text"
		placeholder="Type a message"
		class="block py-1.5 px-2 w-full rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
		autocomplete="off"
	/>
	{#if text}
		<button
			type="submit"
			title="Send message"
			aria-label="Send message"
			class="rounded-md focus:outline-cyan-600"
		>
			<img src="/icons/send.svg" alt="Send message" class="w-7 h-7" />
		</button>
	{:else}
		<button
			type="button"
			title="Record audio"
			aria-label="Record audio"
			class="rounded-md focus:outline-cyan-600"
		>
			<img src="/icons/microphone.svg" alt="Record audio" class="w-7 h-7" />
		</button>
	{/if}
</form>
