<script lang="ts">
  import { onMount } from "svelte";
  import { toCanvas } from "qrcode";

  const SIZES = {
    small: 80,
    medium: 110,
    large: 200,
  };

  export let text: string;
  export let size: keyof typeof SIZES = "medium";

  let canvas: HTMLCanvasElement | null = null;

  onMount(() => {
    toCanvas(canvas, text, { margin: 0, width: SIZES[size] });
  });
</script>

<canvas bind:this={canvas} />
