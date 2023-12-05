<script lang="ts">
	import Trigger from './Trigger.svelte';
	import Picker from './Picker.svelte';
	import { clickOutside } from '$lib/actions/clickOutside';
  import { hoveredEmoji } from './store';

	export let onPick: (emoji: string) => void;

	let isOpen = false;

  function handleClose() {
    isOpen = false;
    $hoveredEmoji = null;
  }
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && handleClose()} />

<div use:clickOutside={handleClose} class="relative">
	<Trigger onToggle={() => (isOpen = !isOpen)} />
	{#if isOpen}
		<Picker {onPick} />
	{/if}
</div>
