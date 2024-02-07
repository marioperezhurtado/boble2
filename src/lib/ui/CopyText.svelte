<script lang="ts">
  export let text: string;

  function handleCopy() {
    navigator.clipboard.writeText(text);
  }
</script>

<div class="flex gap-2 items-center p-1.5 pl-2.5 rounded-md border bg-zinc-50
shadow-sm">
  <p class="flex-1">{text}</p>
  <button
    on:click={handleCopy}
    aria-label="Copy text"
    class="p-1.5 text-white bg-white rounded-md border"
  >
    <img src="/icons/copy.svg" alt="Copy text" class="w-4 h-4" />
  </button>
</div>
