<script lang="ts">
  export let text: string;
  export let icon: string;
  export let onOpen: () => void;
</script>

<li>
  <button
    on:click={onOpen}
    type="button"
    class="flex w-full gap-3 items-center py-2 px-3 transition hover:bg-zinc-100"
  >
    <img src={icon} alt="{text} icon" class="w-5 h-5" />
    {text}
  </button>
</li>
