<script lang="ts">
  import ToggleSwitch from "$lib/ui/ToggleSwitch.svelte";
</script>

<div class="flex flex-col gap-4 pt-8 px-4">
  <div class="flex gap-3 items-center">
    <img src="/icons/camera.svg" alt="Shared media" height="18" width="18" />
    <h2 class="text-sm font-medium">Shared media</h2>
    <img
      src="/icons/chevron.svg"
      alt="Chevron right"
      height="18"
      width="18"
      class="ml-auto rotate-90"
    />
  </div>

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
      <p class="text-xs text-zinc-500 pt-1">
        Messages are end-to-end encrypted.
      </p>
      <p class="text-xs text-zinc-500">
        Tap to verify.
      </p>
    </div>
  </div>
</div>
