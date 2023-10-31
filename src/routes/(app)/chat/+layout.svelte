<script lang="ts">
  import { page } from "$app/stores";
  import ChatList from "./_components/ChatList.svelte";
  import AppHeader from "../_components/AppHeader.svelte";
  import type { LayoutData } from "./$types";

  const chats = $page.data.chats as LayoutData["chats"];
</script>

<svelte:head>
  <title>BOBLE Web Chat</title>
</svelte:head>

<div class="flex flex-col h-screen bg-zinc-200">
  <AppHeader />
  <main class="flex flex-grow mx-auto w-full max-w-screen-xl md:overflow-hidden bg-zinc-200 border-x border-zinc-300">
    <div
      class="w-full md:block md:max-w-sm bg-zinc-50"
      class:hidden={!!$page.params.chatId}>
        <ChatList chats={chats} />
    </div>
    <div
      class="flex-col w-full h-full border-l md:flex"
      class:hidden={!$page.params.chatId}>
      <slot />
    </div>
  </main>
</div>
