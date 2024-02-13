<script lang="ts">
  import type { Contacts } from "$lib/db/contact/getContacts";

  export let initialContacts: Contacts;
  export let filteredContacts: Contacts;

  let search = "";

  $: {
    const trimedSearch = search.trim();
    if (trimedSearch === "") {
      filteredContacts = initialContacts;
    } else {
      filteredContacts = initialContacts.filter((contact) =>
        contact.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
  }
</script>

<input
  bind:value={search}
  id="search"
  name="search"
  type="search"
  placeholder="Search contacts"
  class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
  autocomplete="off"
/>
