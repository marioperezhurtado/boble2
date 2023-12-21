<script lang="ts">
  import { fly } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";

  export let isOpen: boolean;

  let menu: HTMLUListElement;
  let pos = { x: 0, y: 0 };
  let browser = { width: 0, height: 0 };

  function handleOpen({ clientX, clientY }: MouseEvent) {
    pos = { x: clientX, y: clientY };
    browser = { width: window.innerWidth, height: window.innerHeight };
    const { width, height } = menu.getBoundingClientRect();

    if (browser.height - pos.y < height) {
      pos.y -= height;
    }
    if (browser.width - pos.x < width) {
      pos.x -= width;
    }
  }
</script>

<svelte:window on:contextmenu|once={handleOpen} />

<ul
  bind:this={menu}
  use:clickOutside={() => (isOpen = false)}
  transition:fly={{ y: 30, duration: 150 }}
  class="flex fixed z-30 flex-col w-36 text-xs font-medium bg-white rounded-md border shadow-sm text-zinc-600 border-zinc-200"
  style="top:{pos.y}px; left:{pos.x}px"
>
  <slot />
</ul>
