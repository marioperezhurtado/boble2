<script lang="ts">
  export let size: keyof typeof SIZES = "medium";
  export let intent: keyof typeof INTENTS = "primary";
  export let fullWidth = false;

  const SIZES = {
    small: "py-1.5 px-2.5 text-xs",
    medium: "py-1.5 px-3 text-sm",
  };

  const INTENTS = {
    primary: "bg-cyan-600 border-cyan-600 hover:brightness-110 focus:outline-cyan-600 text-white",
    secondary: "bg-white focus:outline-cyan-200 text-zinc-600",
    danger: "bg-red-500 hover:bg-red-600 border-red-500 focus:outline-red-600 text-white",
    dangerSecondary: "bg-red-100 hover:bg-red-200 border-red-100 focus:outline-red-200 text-red-700",
  };
</script>

<a
  href={$$restProps.href}
  {...$$restProps}
  class="w-fit border font-semibold rounded-md shadow-sm transition flex gap-2 items-center justify-center {$$restProps.class} {SIZES[size]} {INTENTS[intent]}"
  class:w-full={fullWidth}
>
  <slot />
</a>
