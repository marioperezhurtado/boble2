<script lang="ts">
  import Trigger from "./Trigger.svelte";
  import Picker from "./Picker.svelte";
  import { clickOutside } from "$lib/actions/clickOutside";

  export let onPick: (emoji: string) => void;

  let isOpen = false;

  function handlePickEmoji(emoji: string) {
    onPick(emoji);
    isOpen = false;
  }

  function handleClose() {
    isOpen = false;
  }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && handleClose()} />

<div
  use:clickOutside={handleClose}
  class="flex relative items-center min-w-fit"
>
  <Trigger onToggle={() => (isOpen = !isOpen)} />
  {#if isOpen}
    <Picker onPick={handlePickEmoji} />
  {/if}
</div>
