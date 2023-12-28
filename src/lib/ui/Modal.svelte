<script lang="ts">
  import { scale, fade } from "svelte/transition";
  import { goto } from "$app/navigation";
  import ActionIconLink from "./ActionIconLink.svelte";
  import ActionIconButton from "./ActionIconButton.svelte";

  export let title: string;
  export let backTo: string | null = null;
  export let onClose: (() => void) | null = null;

  function handleClose() {
    if (onClose) {
      onClose();
    }
    if (backTo) {
      goto(backTo);
    }
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  }}
/>

<div
  on:click|stopPropagation={handleClose}
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 100 }}
  role="presentation"
  class="fixed top-0 left-0 z-30 w-full h-full cursor-pointer bg-black/50 backdrop-blur-[2px]"
/>

<div
  in:scale={{ start: 0.7, duration: 350 }}
  out:scale={{ start: 0.7, duration: 150 }}
  class="fixed top-1/2 left-1/2 z-30 px-4 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
>
  <div class="relative py-4 px-5 w-full bg-white rounded-md border shadow-md">
    <div class="flex gap-5 justify-between mb-5">
      <h1 class="text-lg sm:text-xl font-bold">{title}</h1>

      {#if backTo}
        <ActionIconLink href={backTo} title="Close" icon="/icons/close.svg" />
      {:else if onClose}
        <ActionIconButton
          href="#"
          title="Close"
          icon="/icons/close.svg"
          on:click={onClose}
        />
      {/if}
    </div>

    <slot />
  </div>
</div>
