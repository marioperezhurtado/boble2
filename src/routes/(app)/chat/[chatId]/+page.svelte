<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import MessageList from "./_components/MessageList.svelte";
  import SendMessage from "./_components/SendMessage.svelte";
  import ChatTopBar from "./_components/ChatTopBar.svelte";
  import ChatInfo from "./_components/ChatInfo.svelte";
  import DeleteChatConfirm from "./_components/DeleteChatConfirm.svelte";

  $: data = $page.data as PageData;
  $: isDeleting = $page.url.searchParams.has("delete");
</script>

<section class="flex relative flex-col flex-grow h-full">
  <ChatTopBar chat={data.chat} />
  <MessageList
    initialMessages={data.messages ?? []}
    lastReadAt={data.chat?.user.lastReadAt ?? new Date(0)}
    chatId={$page.params.chatId}
    userId={data.user.id}
    isSavedContact={data.chat?.user.alias !== null}
  />
  <SendMessage />
  <ChatInfo />
</section>

{#if isDeleting}
  <DeleteChatConfirm />
{/if}
