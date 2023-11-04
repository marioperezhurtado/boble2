<script lang="ts">
  import { page } from "$app/stores";
  import AppHeader from "../_components/AppHeader.svelte";
  import ContactList from "./_components/ContactList.svelte";
  import Sidebar from "../chat/_components/Sidebar.svelte";
  import type { LayoutServerData } from "./$types";

  $: data = $page.data as LayoutServerData;
</script>

<svelte:head>
  <title>BOBLE Web Chat</title>
</svelte:head>

<div class="flex flex-col h-screen bg-zinc-200">
  <AppHeader />
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
