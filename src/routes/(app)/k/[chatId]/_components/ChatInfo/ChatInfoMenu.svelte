<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";
  import ActionIconLink from "$lib/ui/ActionIconLink.svelte";

  export let title: string;
  export let backTo: string;
</script>

<aside
  use:clickOutside={() => goto($page.url.pathname)}
  in:fly={{ x: 200, duration: 300 }}
  out:fly={{ x: 200, duration: 200 }}
  class="flex absolute top-0 right-0 z-20 flex-col w-screen h-full border-l xs:w-80 bg-zinc-50"
>
  <div class="flex gap-4 items-center py-3 px-2 border-b">
    <ActionIconLink
      href={backTo}
      title="Close {title.toLowerCase()}"
      icon="/icons/arrow.svg"
      class="rotate-90"
    />
    <h2 class="font-semibold">{title}</h2>
  </div>

  <div class="flex overflow-y-auto flex-col flex-grow">
    <slot />
  </div>
</aside>
