<script lang="ts">
  export let title: string;
  export let icon: string;
</script>

<button
  class="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition"
  {title}
  {...$$restProps}
  on:click
>
  <img src={icon} alt={title} class="w-4 h-4" />
</button>
