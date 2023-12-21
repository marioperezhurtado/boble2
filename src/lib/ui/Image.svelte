<script lang="ts">
  export let src: string;
  export let alt: string;
  export let brokenFile = false;

  function handleError(e: Event) {
    e.stopPropagation();
    src = "/fallback-image.webp";
    brokenFile = true;
  }
</script>

<img
  on:error={handleError}
  class="rounded-lg"
  {src}
  {alt}
  {...$$restProps}
/>
