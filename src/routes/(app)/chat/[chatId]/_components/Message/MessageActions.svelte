<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";
  import { replyingTo } from "../stores";
  import type { Message } from "$lib/db/message/getMessages";
  import ContextMenu from "$lib/ui/ContextMenu.svelte";

  export let isOpen: boolean;
  export let message: Message;
  export let isOwn: boolean;

  function handleCopy() {
    navigator.clipboard.writeText(message.text ?? "");
    isOpen = false;
  }

  function handleReply() {
    $replyingTo = message;
    isOpen = false;
  }
</script>

<ContextMenu bind:isOpen>
  <ul
    in:fly={{ y: 30, duration: 150 }}
    use:clickOutside={() => (isOpen = false)}
    class="flex flex-col w-36 text-xs font-medium bg-white rounded-md border shadow-sm text-zinc-600 border-zinc-200"
  >
    <li>
      <button
        on:click={handleReply}
        class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      >
        Reply
        <img src="/icons/reply.svg" alt="Reply" width="17" height="17" />
      </button>
    </li>
    <li>
      <button
        on:click={handleCopy}
        class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      >
        Copy Text
        <img src="/icons/copy.svg" alt="Copy" width="17" height="17" />
      </button>
    </li>
    <li>
      <button
        class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      >
        Pin Message
        <img src="/icons/pin.svg" alt="Pin" width="17" height="17" />
      </button>
    </li>
    <li>
      {#if isOwn}
        <a
          href={$page.url.pathname + "?deleteMessage=" + message.id}
          class="flex justify-between items-center py-2 px-2.5 w-full text-red-600 hover:bg-zinc-100"
        >
          Delete Message
          <img src="/icons/delete.svg" alt="Delete" width="17" height="17" />
        </a>
      {:else}
        <button
          class="flex justify-between items-center py-2 px-2.5 w-full text-red-600 hover:bg-zinc-100"
        >
          Report Message
          <img src="/icons/report.svg" alt="Report" width="17" height="17" />
        </button>
      {/if}
    </li>
  </ul>
</ContextMenu>
