<script lang="ts">
  import ExpandedImage from "./ExpandedImage.svelte";

  export let src: string;
  export let alt: string;
  export let brokenFile = false;

  let isExpanded = false;

  function handleExpand() {
    if (brokenFile) return;
    isExpanded = true;
  }

  function handleError(e: Event) {
    e.stopPropagation();
    src = "/fallback-image.webp";
    brokenFile = true;
  }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && (isExpanded = false)} />

<div
  role="button"
  tabindex="0"
  on:click={handleExpand}
  on:keydown={(e) => e.key === "Enter" && (isExpanded = true)}
  class="bg-zinc-100 h-full w-full rounded-lg {$$restProps.class} overflow-hidden"
>
  <img
    {src}
    {alt}
    {...$$restProps}
    on:error={handleError}
    class="object-cover w-full h-full"
  />

  {#if isExpanded}
    <ExpandedImage bind:expanded={isExpanded}>
      <img {src} {alt} class="object-contain w-full h-full" draggable={false} />
    </ExpandedImage>
  {/if}
</div>
