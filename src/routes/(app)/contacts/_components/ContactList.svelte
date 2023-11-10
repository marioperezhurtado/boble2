<script lang="ts">
  import { page } from "$app/stores";
  import FilterContacts from "./FilterContacts.svelte";
  import Contact from "./Contact.svelte";
  import ActionIconLink from "$lib/ui/ActionIconLink.svelte";
  import type { Contacts } from "$lib/db/contact/getContacts";

  export let contacts: Contacts;

  let filteredContacts = contacts;
</script>

<div class="flex gap-2 items-center p-2">
  <FilterContacts initialContacts={contacts} bind:filteredContacts />
  <ActionIconLink
    href={$page.url.pathname + "?create"}
    title="Add contact"
    icon="/icons/add-contact.svg"
  />
</div>

{#if filteredContacts.length > 0}
  <ul class="border-t">
    {#each filteredContacts as contact}
      <Contact {contact} isSelected={contact.id === $page.params.contactId} />
    {/each}
  </ul>
{:else}
  <p class="py-1 pl-3 font-medium border-t">No contacts found.</p>
{/if}
