<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";
  import type { Contact } from "$lib/db/contact/getContacts";
  import ContextMenu from "$lib/ui/ContextMenu.svelte";

  export let contact: Contact;
  export let isOpen: boolean;

  function handleOpenInNewTab() {
    window.open(`/contacts/${contact.id}`);
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
    <li>
      <a
        href={$page.url.pathname + "?editContact=" + contact.id}
        class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      >
        Edit Contact
        <img src="/icons/edit.svg" alt="Edit" width="17" height="17" />
      </a>
    </li>
    <li>
      <button
        class="flex justify-between items-center py-2 px-2.5 w-full hover:bg-zinc-100"
      >
        Share
        <img
          src="/icons/share.svg"
          alt="Share contact"
          width="17"
          height="17"
        />
      </button>
    </li>

    <li>
      <a
        href={$page.url.pathname + "?deleteContact=" + contact.id}
        class="flex justify-between items-center py-2 px-2.5 w-full text-red-600 hover:bg-zinc-100"
      >
        Delete Contact
        <img src="/icons/delete.svg" alt="Delete" width="17" height="17" />
      </a>
    </li>
  </ul>
</ContextMenu>
