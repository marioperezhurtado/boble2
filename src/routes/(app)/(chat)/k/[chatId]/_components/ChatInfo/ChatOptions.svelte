<script lang="ts">
  import { page } from "$app/stores";
  import ToggleSwitch from "$lib/ui/ToggleSwitch.svelte";
  import ChatInfoMenu from "./ChatInfoMenu.svelte";
  import SharedMedia from "./SharedMedia/SharedMedia.svelte";

  $: info = $page.url.searchParams.get("info");
</script>

<div class="flex flex-col gap-4 px-4 pt-8">
  <a href={$page.url.pathname + "?info=media"} class="flex gap-3 items-center">
    <img src="/icons/camera.svg" alt="Shared media" height="18" width="18" />
    <h2 class="text-sm font-medium">Shared media</h2>
    <img
      src="/icons/chevron.svg"
      alt="Chevron right"
      height="18"
      width="18"
      class="ml-auto rotate-90"
    />
  </a>

  <div class="flex gap-3 items-center">
    <img src="/icons/star.svg" alt="Favorite messages" height="18" width="18" />
    <h2 class="text-sm font-medium">Favorite messages</h2>
    <img
      src="/icons/chevron.svg"
      alt="Chevron right"
      height="18"
      width="18"
      class="ml-auto rotate-90"
    />
  </div>

  <div class="flex gap-3 items-center">
    <img src="/icons/bell.svg" alt="Notifications" height="18" width="18" />
    <h2 class="text-sm font-medium">Notifications</h2>

    <ToggleSwitch />
  </div>

  <div class="flex gap-3 items-start">
    <img src="/icons/lock.svg" alt="Encryption" height="18" width="18" />
    <div>
      <h2 class="text-sm font-medium">Encryption</h2>
      <p class="pt-1 text-xs text-zinc-500">
        Messages are end-to-end encrypted.
      </p>
      <p class="text-xs text-zinc-500">Tap to verify.</p>
    </div>
  </div>
</div>

{#if info === "media"}
  <ChatInfoMenu title="Shared media" backTo={$page.url.pathname + "?info"}>
    <SharedMedia />
  </ChatInfoMenu>
{/if}
