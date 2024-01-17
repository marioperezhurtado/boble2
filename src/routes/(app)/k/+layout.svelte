<script lang="ts">
  import { page } from "$app/stores";
  import type { LayoutData } from "./$types";
  import AppHeader from "../_components/AppHeader.svelte";
  import ChatList from "./_components/ChatList.svelte";
  import Sidebar from "../_components/Sidebar.svelte";
  import DeleteChatConfirm from "./_components/DeleteChatConfirm.svelte";

  $: data = $page.data as LayoutData;
  $: deletingChat = data.chats.find(
    (chat) => chat.id === $page.url.searchParams.get("deleteChat"),
  );
</script>

<div class="flex flex-col h-screen bg-zinc-200">
  <AppHeader />
  <main
    class="flex overflow-hidden flex-grow mx-auto w-full max-w-screen-xl bg-zinc-200 border-x border-zinc-300"
  >
    <Sidebar>
      <ChatList />
    </Sidebar>
    <div
      class="flex flex-col w-full h-full border-l md:flex bg-zinc-50"
      class:hidden={!$page.params.chatId}
    >
      <slot />
    </div>
  </main>
</div>

{#if deletingChat}
  <DeleteChatConfirm chat={deletingChat} />
{/if}
