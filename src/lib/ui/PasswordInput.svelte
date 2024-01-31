<script lang="ts">
	import Input from './Input.svelte';

  export let value = "";

	let showPassword = false;
</script>

<div class="relative">
	<Input 
    type={showPassword ? 'text' : 'password'}
    {...$$restProps} 
    bind:value
  />
	<button
		type="button"
		on:click={() => (showPassword = !showPassword)}
		title={showPassword ? 'Hide password' : 'Show password'}
		class="absolute top-2 right-2 w-fit"
	>
		{#if showPassword}
			<img src="/icons/eye-off.svg" alt="Hide password" class="w-5 h-5" />
		{:else}
			<img src="/icons/eye.svg" alt="Show password" class="w-5 h-5" />
		{/if}
	</button>
</div>
