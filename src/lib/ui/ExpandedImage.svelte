<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import ActionIconButton from "./ActionIconButton.svelte";

  export let expanded = false;
</script>

<div
  on:click|stopPropagation={() => (expanded = false)}
  in:fade={{ duration: 200 }}
  role="presentation"
  class="fixed top-0 left-0 z-30 w-full h-full bg-black/50 backdrop-blur-[2px]"
>
  <ActionIconButton
    title="Close"
    icon="/icons/close.svg"
    class="fixed top-6 right-8 z-30"
    on:click={(e) => {
      e.stopPropagation();
      expanded = false;
    }}
  />
</div>

<div
  on:click|stopPropagation
  role="presentation"
  in:scale={{ start: 0.7, duration: 350 }}
  class="flex overflow-hidden fixed top-1/2 left-1/2 z-30 justify-center items-center p-4 w-full max-w-screen-sm h-5/6 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
>
  <slot />
</div>
