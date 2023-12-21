<script lang="ts">
  import { scale } from "svelte/transition";
  import { replyingTo } from "./stores";

  export let onScrollBottom: () => void;
  export let unreadCount: number;

</script>

<button
  transition:scale={{ start: 0.7, duration: 300 }}
  on:click={onScrollBottom}
  aria-label="Scroll to bottom"
  class="flex absolute right-5 z-20 justify-center items-center w-12 h-12
  bg-white rounded-full border shadow-md hover:bg-zinc-50"
  style="
    bottom: {$replyingTo ? 7.5 : 4.1}rem;
    transition-duration: 200ms;
    transition-timing-function: cubic-out;
  "
>
  <img src="/icons/arrow.svg" alt="Scroll to bottom" height="20" width="20" />

  {#if unreadCount > 0}
    <p
      transition:scale={{ duration: 300 }}
      class="absolute -top-1 -left-1 px-1.5 pt-0.5 font-mono text-xs text-center text-cyan-50 bg-cyan-600 rounded-full"
    >
      {unreadCount}
    </p>
  {/if}
</button>
