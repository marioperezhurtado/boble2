<script lang="ts">
  import { page } from "$app/stores";
  import type { Contact } from "$lib/db/contact/getContacts";
  import ContextMenu from "$lib/ui/ContextMenu/ContextMenu.svelte";
  import ContextMenuItem from "$lib/ui/ContextMenu/ContextMenuItem.svelte";

  export let contact: Contact;
  export let isOpen: boolean;

  function handleOpenInNewTab() {
    window.open(`/contacts/${contact.id}`);
    isOpen = false;
  }
</script>

<ContextMenu bind:isOpen>
  <ContextMenuItem
    text="Open in new tab"
    icon="/icons/new-tab.svg"
    on:click={handleOpenInNewTab}
  />
  <ContextMenuItem
    text="Edit contact"
    icon="/icons/edit.svg"
    href="{$page.url.pathname}?editContact={contact.id}"
  />
  <ContextMenuItem
    text="Share"
    icon="/icons/share.svg"
  />
  <ContextMenuItem
    text="Delete contact"
    icon="/icons/delete.svg"
    href="{$page.url.pathname}?deleteContact={contact.id}"
    danger
  />
</ContextMenu>
