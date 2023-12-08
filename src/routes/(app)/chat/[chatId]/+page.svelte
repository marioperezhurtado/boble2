<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import MessageList from "./_components/MessageList.svelte";
  import SendMessage from "./_components/SendMessage.svelte";
  import ChatTopBar from "./_components/ChatTopBar.svelte";
  import ChatInfo from "./_components/ChatInfo.svelte";
  import DeleteChatConfirm from "./_components/DeleteChatConfirm.svelte";
  import DeleteMessageConfirm from "./_components/DeleteMessageConfirm.svelte";

  $: data = $page.data as PageData;
  $: isInfoOpen = $page.url.searchParams.has("info");
  $: isDeletingChat = $page.url.searchParams.has("delete");
  $: deletingMessage = data.messages.find(
    (message) => message.id === $page.url.searchParams.get("deleteMessage"),
  );
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

  {#if isInfoOpen}
    <ChatInfo />
  {/if}
</section>

{#if isDeletingChat}
  <DeleteChatConfirm />
{/if}
{#if deletingMessage}
  <DeleteMessageConfirm message={deletingMessage} />
{/if}
