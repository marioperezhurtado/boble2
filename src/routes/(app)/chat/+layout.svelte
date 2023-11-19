<script lang="ts">
  import { page } from "$app/stores";
  import AppHeader from "../_components/AppHeader.svelte";
  import ChatList from "./_components/ChatList.svelte";
  import Sidebar from "./_components/Sidebar.svelte";
  import type { LayoutData } from "./$types";

  $: data = $page.data as LayoutData;
</script>

<svelte:head>
  <title>BOBLE Web Chat</title>
</svelte:head>

<div class="flex flex-col h-screen bg-zinc-200">
  <AppHeader />
  <main
    class="flex overflow-hidden flex-grow mx-auto w-full max-w-screen-xl bg-zinc-200 border-x border-zinc-300"
  >
    <Sidebar>
      <ChatList chats={data.chats} />
    </Sidebar>
    <div
      class="flex flex-col w-full h-full border-l"
      class:hidden={!$page.params.chatId}
    >
      <slot />
    </div>
  </main>
</div>
