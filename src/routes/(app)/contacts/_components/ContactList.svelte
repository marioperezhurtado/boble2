<script lang="ts">
  import { page } from "$app/stores";
  import FilterContacts from "./FilterContacts.svelte";
  import Contact from "./Contact.svelte";
  import type { Contacts } from "$lib/db/getContacts";

  export let contacts: Contacts;

  let filteredContacts = contacts;
</script>

<FilterContacts initialContacts={contacts} bind:filteredContacts />

{#if filteredContacts.length > 0}
  <ul class="flex flex-col gap-3 border-t">
    {#each filteredContacts as contact}
      <Contact {contact} isSelected={contact.id === $page.params.contactId} />
    {/each}
  </ul>
{:else}
  <p class="py-1 pl-3 font-medium border-t">No contacts found.</p>
{/if}
