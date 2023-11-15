<script lang="ts">
  export let onToggle: () => void;
</script>

<button
  on:click={onToggle}
  type="button"
  title="Open GIF picker"
  aria-label="Open GIF picker"
  class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
>
  <img src="/icons/gif.svg" alt="Open GIF picker" class="w-7 h-7" />
</button>
