<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";
  import ActionIconLink from "$lib/ui/ActionIconLink.svelte";

  export let title: string;
</script>

<aside
  use:clickOutside={() => goto($page.url.pathname)}
  in:fly={{ x: 200, duration: 300 }}
  out:fly={{ x: 200, duration: 200 }}
  class="flex absolute right-0 z-20 flex-col w-screen h-full border-l xs:w-80
  bg-zinc-50"
>
  <div class="flex gap-4 items-center py-3 px-2 border-b">
    <ActionIconLink
      href={$page.url.pathname}
      title="Close chat info"
      icon="/icons/close.svg"
    />
    <h2 class="font-semibold">{title}</h2>
  </div>

  <div class="flex flex-col flex-grow overflow-y-auto">
    <slot />
  </div>
</aside>
