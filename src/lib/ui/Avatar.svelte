<script lang="ts">
  import { minidenticon } from "minidenticons";
  import ExpandedImage from "./ExpandedImage.svelte";

  type User = {
    name: string;
    email: string;
    image: string | null;
  };

  export let user: User;
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

  $: imageSource = user.image ?? generateIdenticon(user.email);
</script>

<img
  src={imageSource}
  alt={user.name}
  class="object-cover rounded-full border shadow-sm {SIZES[size]} 
    aspect-square"
  class:bg-zinc-100={user.image}
  class:bg-white={!user.image}
  draggable={false}
/>

{#if expanded}
  <ExpandedImage bind:expanded>
    <img
      src={imageSource}
      alt={user.name + "'s avatar"}
      class="object-cover w-full bg-white rounded-md border shadow-md aspect-square border-zinc-400"
      draggable={false}
    />
  </ExpandedImage>
{/if}
