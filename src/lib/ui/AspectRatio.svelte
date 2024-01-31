<script lang="ts">
  export let width: number;
  export let height: number;
  export let maxWidth: number;
  export let maxHeight: number;

  const aspectRatio = width / height;
  const maxAspectRatio = maxWidth / maxHeight;

  const resultWidth =
    aspectRatio > maxAspectRatio ? maxWidth : maxHeight * aspectRatio;
  const resultHeight =
    aspectRatio > maxAspectRatio ? maxWidth / aspectRatio : maxHeight;
</script>

<div
  style="
  width: {resultWidth}px; 
  height: {resultHeight}px;
  max-width: {maxWidth}px;
  max-height: {maxHeight}px;"
  {...$$restProps}
>
  <slot />
</div>
