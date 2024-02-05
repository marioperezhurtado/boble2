<script lang="ts">
  import { page } from "$app/stores";

  export let title: string;
  export let icon: string;
  export let isActive = false;
</script>

<a
  {...$$restProps}
  href={$$restProps.href}
  class="flex justify-center items-center w-8 h-8 rounded-full transition-all
  aspect-square hover:bg-zinc-200 hover:border-zinc-300 border {$$restProps.class}"
  class:bg-zinc-100={!isActive}
  class:bg-zinc-200={isActive}
  class:border-zinc-300={isActive}
  {title}
>
  <img src={icon} alt={title} class="w-4 h-4" />
</a>
