<script lang="ts">
  import type { Contacts } from "$lib/db/contact/getContacts";
  import Input from "$lib/ui/Input.svelte";

  export let initialContacts: Contacts;
  export let filteredContacts: Contacts;

  let search = "";

  $: {
    const trimedSearch = search.trim();
    if (trimedSearch === "") {
      filteredContacts = initialContacts;
    } else {
      filteredContacts = initialContacts.filter((contact) =>
        contact.name?.toLowerCase().includes(search.toLowerCase()),
      );
    }
  }
</script>

<Input
  bind:value={search}
  type="search"
  placeholder="Search contacts"
  autocomplete="off"
/>
