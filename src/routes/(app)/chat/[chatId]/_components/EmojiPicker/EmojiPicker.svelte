<script lang="ts">
	import Trigger from './Trigger.svelte';
	import Picker from './Picker.svelte';
	import { clickOutside } from '$lib/utils/clickOutside';

	export let onPick: (emoji: string) => void;

	let isOpen = false;
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && (isOpen = false)} />

<div use:clickOutside={() => isOpen = false} class="relative">
	<Trigger onToggle={() => (isOpen = !isOpen)} />
	{#if isOpen}
		<Picker {onPick} />
	{/if}
</div>
