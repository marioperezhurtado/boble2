<script lang="ts">
	import Input from './Input.svelte';

	let showPassword = false;
</script>

<div class="relative">
	<Input 
    type={showPassword ? 'text' : 'password'}
    {...$$restProps} 
  />
	<button
		type="button"
		on:click={() => (showPassword = !showPassword)}
		title={showPassword ? 'Hide password' : 'Show password'}
		class="absolute right-2 top-1/2 -translate-y-1/2 w-fit"
	>
		{#if showPassword}
			<img src="/icons/eye-off.svg" alt="Hide password" class="w-5 h-5" />
		{:else}
			<img src="/icons/eye.svg" alt="Show password" class="w-5 h-5" />
		{/if}
	</button>
</div>
