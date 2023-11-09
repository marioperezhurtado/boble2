<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { minidenticon } from "minidenticons";
  import ActionIconButton from "./ActionIconButton.svelte";

  export let image: string | null = null;
  export let name: string;
  export let size: keyof typeof SIZES = "medium";
  export let expanded = false;

  const SATURATION = 60;
  const LIGHTNESS = 50;

  const SIZES = {
    small: "w-10 h-10",
    medium: "w-12 h-12",
    large: "w-20 h-20",
  };

  function generateIdenticon(str: string) {
    return (
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(str, SATURATION, LIGHTNESS))
    );
  }

  $: imageSource = !!image ? image : generateIdenticon(name);
</script>

<img
  src={imageSource}
  alt={name}
  class="object-cover rounded-full border shadow-sm {SIZES[size]} 
    aspect-square"
  draggable={false}
/>

{#if expanded}
  <div
    on:click|stopPropagation={() => (expanded = false)}
    in:fade={{ duration: 200 }}
    role="presentation"
    class="fixed top-0 left-0 z-30 w-full h-full bg-black/50 backdrop-blur-[2px]"
  />
  <ActionIconButton
    title="Close"
    icon="/icons/close.svg"
    class="fixed top-6 right-6 z-30"
    on:click={(e) => {
      e.stopPropagation();
      expanded = false;
    }}
  />

  <div
    on:click|stopPropagation
    role="presentation"
    in:scale={{ start: 0.7, duration: 350 }}
    class="overflow-hidden fixed left-1/2 z-40 w-5/6 h-auto rounded-md border shadow-md -translate-x-1/2 cursor-default sm:top-1/2 sm:w-auto sm:h-2/3 sm:-translate-y-1/2 top-1/5 max-h-[30rem] aspect-square border-zinc-400"
  >
    <img
      src={imageSource}
      alt={name}
      class="object-cover w-full h-full bg-white"
      draggable={false}
    />

    <div
      class="absolute bottom-2.5 left-2.5 z-30 py-1.5 px-3 rounded-md bg-zinc-200/70 backdrop-blur-sm"
    >
      <h2 class="text-sm font-bold">
        {name}
      </h2>
    </div>
  </div>
{/if}
