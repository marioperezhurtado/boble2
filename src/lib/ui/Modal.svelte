<script lang="ts">
  import { scale, fade } from "svelte/transition";
  import { goto } from "$app/navigation";
  import ActionIconLink from "./ActionIconLink.svelte";

  export let backTo: string;
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "Escape") {
      goto(backTo);
    }
  }}
/>

<div
  on:click|stopPropagation={() => goto(backTo)}
  in:fade={{ duration: 200 }}
  role="presentation"
  class="fixed top-0 left-0 z-30 w-full h-full cursor-pointer bg-black/50 backdrop-blur-[2px]"
/>

<div
  in:scale={{ start: 0.7, duration: 350 }}
  class="fixed left-1/2 top-1/2 md:top-1/3 z-30 px-4 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
>
  <div class="relative p-6 w-full bg-white rounded-md border shadow-md">
    <slot />

    <ActionIconLink
      href={backTo}
      title="Close"
      icon="/icons/close.svg"
      class="absolute top-4 right-4"
    />
  </div>
</div>
