<script lang="ts">
  import { page } from "$app/stores";
  import ChatTopBar from "./_components/ChatTopBar.svelte";
  import MessageList from "./_components/MessageList.svelte";
  import ReplyInfo from "./_components/ReplyInfo.svelte";
  import SendMessage from "./_components/SendMessage.svelte";
  import ChatInfo from "./_components/ChatInfo.svelte";
  import DeleteMessageConfirm from "./_components/DeleteMessageConfirm.svelte";
  import BlockUnblockButton from "$lib/ui/BlockUnblockButton.svelte";

  export let data;

  $: isInfoOpen = $page.url.searchParams.has("info");
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
    isSavedContact={data.chat?.user.alias}
  />

  <div class="p-2 px-3 border-t bg-zinc-50">
    {#if data.chat.user.isBlocked}
      <span class="block py-2 mx-auto w-44">
        <BlockUnblockButton
          userId={data.chat.user.id}
          isBlocked={data.chat.user.isBlocked}
        />
      </span>
    {:else if data.chat.user.blockedMe}
        <p class="py-4 px-3 text-sm font-medium text-center text-zinc-500">
          This user has blocked you. You can't send messages in this chat.
        </p>
    {:else}
      <ReplyInfo />
      <SendMessage />
    {/if}
  </div>

  {#if isInfoOpen}
    <ChatInfo />
  {/if}
</section>

{#if deletingMessage}
  <DeleteMessageConfirm message={deletingMessage} />
{/if}
