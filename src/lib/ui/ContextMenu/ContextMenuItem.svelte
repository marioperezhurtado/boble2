<script lang="ts">
  export let text: string;
  export let icon: string;
  export let href: string | null = null;
  export let danger = false;
</script>

<li>
  {#if href}
    <a
      {href}
      class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      class:text-red-600={danger}
    >
      {text}
      <img src={icon} alt={text} width="17" height="17" />
    </a>
  {:else}
    <button
      on:click
      class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      class:text-red-600={danger}
    >
      {text}
      <img src={icon} alt={text} width="17" height="17" />
    </button>
  {/if}
</li>
