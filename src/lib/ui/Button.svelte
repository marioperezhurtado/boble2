<script lang="ts">
  export let fullWidth = false;
  export let size: keyof typeof SIZES = "medium";

  const SIZES = {
    small: "py-2 px-3 text-xs",
    medium: "py-2 px-3 text-sm",
  };
</script>

<button
  {...$$restProps}
  class="block w-fit font-bold text-white bg-cyan-700 rounded-md
shadow-sm transition hover:brightness-110 focus:outline-cyan-600
{$$restProps.class} {SIZES[size]}"
  class:w-full={fullWidth}
>
  <slot />
</button>
