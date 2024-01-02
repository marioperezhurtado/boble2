<script lang="ts">
  import { page } from "$app/stores";
  import type { Chat } from "$lib/db/chat/getChats";
  import ContextMenu from "$lib/ui/ContextMenu/ContextMenu.svelte";
  import ContextMenuItem from "$lib/ui/ContextMenu/ContextMenuItem.svelte";

  export let chat: Chat;
  export let isOpen: boolean;

  function handleOpenInNewTab() {
    window.open(`/${chat.id}`);
    isOpen = false;
  }
</script>

<ContextMenu bind:isOpen>
  <ContextMenuItem
    text="Open in new tab"
    icon="/icons/new-tab.svg"
    on:click={handleOpenInNewTab}
  />
  {#if chat.user.alias}
    <ContextMenuItem
      text="Contact info"
      icon="/icons/contact.svg"
      href="/contacts/{chat.user.id}"
    />
  {:else}
    <ContextMenuItem
      text="Add to contacts"
      icon="/icons/add-contact.svg"
      href="/contacts?createContact={chat.user.email}"
    />
  {/if}
  <ContextMenuItem text="Pin chat" icon="/icons/pin.svg" />
  <ContextMenuItem
    text="Delete chat"
    icon="/icons/delete-danger.svg"
    href="{$page.url.pathname}?deleteChat={chat.id}"
    danger
  />
</ContextMenu>
