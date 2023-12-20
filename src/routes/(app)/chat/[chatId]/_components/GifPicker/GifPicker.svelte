<script lang="ts">
  import { clickOutside } from "$lib/actions/clickOutside";
  import { replyingTo } from "../stores";
  import Trigger from "./Trigger.svelte";
  import Picker from "./Picker.svelte";

  let isOpen = false;

  async function handlePickGif(gif: string) {
    const formData = new FormData();
    formData.append("gif", gif);
    formData.append("replyToId", $replyingTo?.id ?? "");

    await fetch("?/sendGif", {
      method: "POST",
      body: formData,
    });

    isOpen = false;
    $replyingTo = null;
  }

  function handleClose() {
    isOpen = false;
  }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && handleClose()} />

<div
  use:clickOutside={handleClose}
  class="flex relative items-center min-w-fit"
>
  <Trigger onToggle={() => (isOpen = !isOpen)} />
  {#if isOpen}
    <Picker onPick={handlePickGif} />
  {/if}
</div>
