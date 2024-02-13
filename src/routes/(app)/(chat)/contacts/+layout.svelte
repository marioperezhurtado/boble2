<script lang="ts">
  import { page } from "$app/stores";
  import Head from "$lib/ui/Head.svelte";
  import AppHeader from "$lib/ui/AppHeader.svelte";
  import ContactList from "./_components/ContactList.svelte";
  import Sidebar from "../_components/Sidebar.svelte";
  import NewContact from "./_components/NewContact.svelte";
  import DeleteContactConfirm from "./_components/DeleteContactConfirm.svelte";
  import EditContact from "./_components/EditContact.svelte";

  export let data;

  $: isCreating = $page.url.searchParams.has("createContact");
  $: deletingContact = data.contacts.find(
    (contact) => contact.id === $page.url.searchParams.get("deleteContact"),
  );
  $: editingContact = data.contacts.find(
    (contact) => contact.id === $page.url.searchParams.get("editContact"),
  );
</script>

<Head
  title="Contacts | Boble Web Chat"
  description="Manage your contacts and start chatting with your friends."
/>

<div class="flex flex-col h-dvh bg-zinc-200">
  <AppHeader user={data.user} />
  <main
    class="flex flex-grow mx-auto w-full max-w-screen-xl md:overflow-hidden bg-zinc-200 border-x border-zinc-300"
  >
    <Sidebar>
      <ContactList contacts={data.contacts} />
    </Sidebar>
    <div
      class="flex-col w-full h-full border-l md:flex"
      class:hidden={!$page.params.contactId}
    >
      <slot />
    </div>
  </main>
</div>

{#if isCreating}
  <NewContact />
{:else if deletingContact}
  <DeleteContactConfirm contact={deletingContact} />
{:else if editingContact}
  <EditContact contact={editingContact} />
{/if}
