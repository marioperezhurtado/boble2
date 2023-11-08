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
  on:click={() => goto(backTo)}
  in:fade={{ duration: 200 }}
  role="presentation"
  class="absolute w-full h-full bg-black/50 top-0 left-0 cursor-pointer z-20"
/>

<div
  in:scale={{ start: 0.7, duration: 350 }}
  class="fixed z-20 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2
w-full max-w-md px-4"
>
  <div class="relative bg-white border shadow-md rounded-md p-6 w-full">
    <slot />

    <ActionIconLink
      href={backTo}
      title="Close"
      icon="/icons/close.svg"
      class="absolute top-4 right-4"
    />
  </div>
</div>
