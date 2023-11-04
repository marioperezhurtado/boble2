<script lang="ts">
  import Spinner from "./Spinner.svelte";

  export let size: keyof typeof SIZES = "medium";
  export let intent: keyof typeof INTENTS = "primary";
  export let fullWidth = false;
  export let isLoading = false;

  const SIZES = {
    small: "py-1.5 px-3 text-xs",
    medium: "py-1.5 px-3 text-sm",
  };

  const INTENTS = {
    primary: "bg-cyan-700 border-cyan-600 hover:bg-cyan-600 focus:outline-cyan-600 text-white",
    secondary: "bg-white focus:outline-cyan-200 text-cyan-700",
    danger: "bg-red-500 hover:bg-red-600 border-red-500 focus:outline-red-600 text-white",
    dangerSecondary: "bg-red-100 hover:bg-red-200 border-red-100 focus:outline-red-200 text-red-700",
  };
</script>

<button
  {...$$restProps}
  class="w-fit border font-semibold rounded-md shadow-sm transition flex gap-2 items-center justify-center {$$restProps.class} {SIZES[size]} {INTENTS[intent]}"
  class:w-full={fullWidth}
  disabled={isLoading}
>
  <slot />
  {#if isLoading}
    <Spinner class="w-3.5 h-3.5" />
  {/if}
</button>
