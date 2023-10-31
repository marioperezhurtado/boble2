<script lang="ts">
  import SocialProviderButton from './SocialProviderButton.svelte';
</script>

<span class="relative my-8 h-px bg-zinc-200">
	<span class="absolute top-1/2 left-1/2 px-1 text-sm bg-white -translate-x-1/2 -translate-y-1/2 text-zinc-500">
    or
  </span>
</span>

<div class="flex flex-col gap-2">
	<SocialProviderButton provider="google" class="border">
    Continue with Google
  </SocialProviderButton>
	<SocialProviderButton provider="github" class="text-white bg-black">
		Continue with GitHub
	</SocialProviderButton>
</div>
