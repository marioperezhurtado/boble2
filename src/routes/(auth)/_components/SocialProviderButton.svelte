<script lang="ts">
  export let provider: 'google' | 'github';
</script>

<a
  href="/login/{provider}"
	class={`flex items-center justify-center gap-2.5 p-2 w-full rounded-md
  shadow-sm focus:outline-cyan-600 text-sm font-medium ${$$restProps.class}`}
>
	<img src={`/icons/${provider}.svg`} alt={provider} class="w-4 h-4" />
  <slot/>
</a>
