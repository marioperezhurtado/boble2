<script lang="ts">
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";
  import { replyingTo } from "./stores";
  import type { PageData } from "../$types";
  import MessageOverview from "./MessageOverview.svelte";

  $: data = $page.data as PageData;
  $: isOwn = $replyingTo?.senderId !== data.chat.user.id;
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && ($replyingTo = null)} />

{#if $replyingTo}
  <div
    transition:slide={{ duration: 200 }}
    class="flex gap-2.5 items-center mb-2"
  >
    <MessageOverview message={$replyingTo} {isOwn} />

    <button
      type="button"
      title="Cancel reply"
      aria-label="Cancel reply"
      class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
      on:click={() => ($replyingTo = null)}
    >
      <img src="/icons/close.svg" alt="Cancel reply" class="w-6 h-6" />
    </button>
  </div>
{/if}
