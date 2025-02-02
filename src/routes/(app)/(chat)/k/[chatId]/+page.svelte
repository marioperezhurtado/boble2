<script lang="ts">
  import { page } from "$app/stores";
  import { messages } from "$lib/stores/store";
  import BlockUnblockButton from "$lib/ui/BlockUnblockButton.svelte";
  import ChatTopBar from "./_components/ChatTopBar.svelte";
  import MessageList from "./_components/MessageList.svelte";
  import ReplyingInfo from "./_components/ReplyingInfo.svelte";
  import SendMessage from "./_components/SendMessage.svelte";
  import AudioRecorder from "./_components/AudioRecorder/AudioRecorder.svelte";
  import ChatInfo from "./_components/ChatInfo/ChatInfo.svelte";
  import DeleteMessageConfirm from "./_components/DeleteMessageConfirm.svelte";
  import SearchMessages from "./_components/SearchMessages.svelte";

  export let data;

  let isRecording = false;

  $: isInfoOpen = $page.url.searchParams.has("info");
  $: isSearching = $page.url.searchParams.has("search");
  $: deletingMessage = $messages.find(
    (message) => message.id === $page.url.searchParams.get("deleteMessage"),
  );
</script>

<section class="flex relative flex-col flex-grow h-full">
  <ChatTopBar chat={data.chat} />
  <MessageList
    initialMessages={data.messages ?? []}
    lastReadAt={data.chat?.user.lastReadAt ?? new Date(0)}
    chatId={data.chat.id}
    userId={data.user.id}
    isSavedContact={!!data.chat?.user.alias}
  />

  <div class="relative p-2 px-2 border-t sm:px-3 bg-zinc-50">
    {#if data.chat.user.isBlocked}
      <span class="block py-2.5 mx-auto w-44">
        <BlockUnblockButton
          userId={data.chat.user.id}
          isBlocked={!!data.chat.user.isBlocked}
        />
      </span>
    {:else if data.chat.user.blockedMe}
      <p class="py-4 px-3 text-sm font-medium text-center text-zinc-500">
        This user has blocked you. You can't send messages in this chat.
      </p>
    {:else}
      <ReplyingInfo />

      {#if isRecording}
        <AudioRecorder onClose={() => (isRecording = false)} />
      {:else}
        <SendMessage onStartRecording={() => (isRecording = true)} />
      {/if}
    {/if}
  </div>

  {#if isInfoOpen}
    <ChatInfo />
  {:else if isSearching}
    <SearchMessages />
  {/if}
</section>

{#if deletingMessage}
  <DeleteMessageConfirm message={deletingMessage} />
{/if}
