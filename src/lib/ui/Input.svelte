<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<input
	class="block py-1.5 px-2 w-full rounded-md border shadow-sm text-sm
  font-medium
  placeholder:text-zinc-400 focus:outline-cyan-600 {$$restProps.class}"
	{...$$restProps}
  on:input={(e) => dispatch("input", e.currentTarget.value)}
/>
