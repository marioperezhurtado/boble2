<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";
  import type { Chat } from "$lib/db/chat/getChats";
  import ContextMenu from "$lib/ui/ContextMenu.svelte";

  export let chat: Chat;
  export let isOpen: boolean;

  function handleOpenInNewTab() {
    window.open(`/chat/${chat.id}`);
    isOpen = false;
  }
</script>

<ContextMenu bind:isOpen>
  <ul
    in:fly={{ y: 30, duration: 150 }}
    use:clickOutside={() => (isOpen = false)}
    class="flex flex-col w-40 text-xs font-medium bg-white rounded-md border shadow-sm text-zinc-600 border-zinc-200"
  >
    <li>
      <button
        on:click={handleOpenInNewTab}
        class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      >
        Open in new tab
        <img
          src="/icons/new-tab.svg"
          alt="Open in new tab"
          width="17"
          height="17"
        />
      </button>
    </li>
    {#if chat.user.alias}
      <li>
        <a
          href="/contacts/{chat.user.id}"
          class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
        >
          Contact info
          <img
            src="/icons/contact.svg"
            alt="Contact info"
            width="17"
            height="17"
          />
        </a>
      </li>
    {:else}
      <li>
        <a
          href="/contacts?createContact={chat.user.email}"
          class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
        >
          Add to contacts
          <img
            src="/icons/add-contact.svg"
            alt="Add to contacts"
            width="17"
            height="17"
          />
        </a>
      </li>
    {/if}
    <li>
      <button
        class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      >
        Pin Chat
        <img src="/icons/pin.svg" alt="Pin" width="17" height="17" />
      </button>
    </li>
    <li>
      <a
        href={$page.url.pathname + "?deleteChat=" + chat.id}
        class="flex justify-between items-center py-2 px-2.5 w-full text-red-600 hover:bg-zinc-100"
      >
        Delete Chat
        <img src="/icons/delete.svg" alt="Delete" width="17" height="17" />
      </a>
    </li>
  </ul>
</ContextMenu>
