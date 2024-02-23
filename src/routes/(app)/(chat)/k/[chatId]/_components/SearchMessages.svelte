<script lang="ts">
  import { page } from "$app/stores";
  import { messages } from "$lib/stores/store";
  import { debounce } from "$lib/utils/debounce";
  import type { PageData } from "../$types";
  import ChatSidebar from "./ChatSidebar.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Message from "./Message/Message.svelte";

  $: data = $page.data as PageData;

  let search = "";
  let matchingMessages: typeof $messages = [];

  async function handleSearch() {
    matchingMessages = $messages.filter((message) =>
      message.text?.toLowerCase().includes(search.toLowerCase()),
    );
  }
</script>

<ChatSidebar title="Search messages" backTo={$page.url.pathname}>
  <div class="p-2 border-b">
    <Input
      bind:value={search}
      on:keyup={debounce(handleSearch)}
      type="search"
      placeholder="Search messages"
      autocomplete="off"
    />
  </div>

  {#if matchingMessages.length > 0}
    <ul class="flex flex-col px-3 pb-4 overflow-y-scroll h-full text-sm">
      {#each matchingMessages as message, i (message.id)}
        {#if message.text}
          <Message
            {message}
            prevMessage={matchingMessages[i - 1]}
            lastReadAt={data.chat?.user.lastReadAt ?? new Date(0)}
            isOwn={message.senderId === data.user.id}
          />
        {/if}
      {/each}
    </ul>
  {/if}
</ChatSidebar>
