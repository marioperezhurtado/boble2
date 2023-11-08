<script lang="ts">
  export let title: string;
  export let icon: string;
</script>

<button
  {...$$restProps}
  class="flex justify-center items-center w-8 h-8 rounded-full transition-all
  bg-zinc-100 aspect-square hover:brightness-95 border {$$restProps.class}"
  {title}
  on:click
>
  <img src={icon} alt={title} class="w-4 h-4" />
</button>
