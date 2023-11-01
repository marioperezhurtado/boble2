<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { capitalize } from "$lib/utils/text";

  export let maxLength: number;
  export let value: string;

  const dispatch = createEventDispatcher();
</script>

<div class="relative">
  <textarea
    {value}
    on:input={(e) => {
      value = capitalize(e.currentTarget.value);
      dispatch("input", capitalize(e.currentTarget.value));
    }}
    class="block py-1.5 px-2 w-full rounded-md border shadow-sm
  placeholder:text-zinc-400 focus:outline-cyan-600 {$$restProps.class}"
    class:focus:outline-red-500={value.length > maxLength}
    {...$$restProps}
  />
  <span
    class="absolute bottom-0.5 right-2 text-xs pointer-events-none"
    class:text-red-500={value.length > maxLength}
    class:text-zinc-500={value.length <= maxLength}
  >
    {value.length}/{maxLength}
  </span>
</div>
