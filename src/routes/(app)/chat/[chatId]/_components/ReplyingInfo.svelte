<script lang="ts">
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";
  import { replyingTo } from "./stores";
  import type { PageData } from "../$types";

  $: data = $page.data as PageData;
  $: isOwn = $replyingTo?.senderId !== data.chat.user.id;
</script>

{#if $replyingTo}
  <div
    transition:slide={{ duration: 200 }}
    class="flex gap-2.5 items-center mb-2"
  >
    <div
      class={`px-2.5 py-1.5 rounded text-xs border-l-4 w-full
      ${
        isOwn ? "bg-cyan-600/10 border-cyan-600" : "bg-zinc-100 border-zinc-300"
      }`}
    >
      <p class="font-semibold">
        {#if isOwn}
          You
        {:else}
          {data.chat.user.alias || data.chat.user.name}
        {/if}
      </p>
      <p class="break-all">{$replyingTo.text}</p>
    </div>

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
