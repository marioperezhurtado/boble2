<script lang="ts">
  export let value = "";
  export let info: string | null = null;
</script>

<input
  {...$$restProps}
  class="block py-1.5 px-2 w-full rounded-md border shadow-sm text-sm
  font-medium
  placeholder:text-zinc-400 focus:outline-cyan-600 {$$restProps.class}"
  bind:value
/>

{#if info}
  <p class="pt-2 text-xs font-normal text-zinc-500">
    {info}
  </p>
{/if}
