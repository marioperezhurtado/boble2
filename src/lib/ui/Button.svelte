<script lang="ts">
  import Spinner from "./Spinner.svelte";

  export let fullWidth = false;
  export let size: keyof typeof SIZES = "medium";
  export let isLoading = false;

  const SIZES = {
    small: "py-2 px-3 text-xs",
    medium: "py-2 px-3 text-sm",
  };
</script>

<button
  {...$$restProps}
  class="w-fit font-bold text-white bg-cyan-700 rounded-md
shadow-sm transition hover:brightness-110 focus:outline-cyan-600 flex gap-2
items-center {$$restProps.class} {SIZES[size]} duration-500"
  class:w-full={fullWidth}
>
  <slot />
  {#if isLoading}
    <Spinner class="w-3.5 h-3.5" />
  {/if}
</button>
