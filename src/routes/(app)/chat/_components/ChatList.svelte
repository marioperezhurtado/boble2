<script lang="ts">
  import { page } from "$app/stores";
  import FilterChats from "./FilterChats.svelte";
  import Chat from "./Chat.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";
  import ActionIconButton from "$lib/ui/ActionIconButton.svelte";
  import type { Chats } from "$lib/db/getChats";
  import type { PageData } from "../$types";

  export let chats: Chats;

  $: data = $page.data as PageData;

  let filteredChats = chats;
</script>

<section>
  <div class="flex justify-between items-center p-2 border-b">
    <a href="/profile">
      <Avatar image={data.user.image} name={data.user.name} size="small" />
    </a>
    <div class="flex gap-1">
      <ActionIconButton title="Friends" icon="/icons/friend.svg" />
      <ActionIconButton title="New Chat" icon="/icons/chat.svg" />
      <ActionIconButton title="Settings" icon="/icons/settings.svg" />
    </div>
  </div>

  <FilterChats initialChats={chats} bind:filteredChats />

  {#if filteredChats.length > 0}
    <ul class="border-t">
      {#each filteredChats as chat}
        <Chat {chat} isSelected={chat.id === $page.params.chatId} />
      {/each}
    </ul>
  {:else}
    <p class="py-1 pl-3 font-medium border-t">No chats found.</p>
  {/if}
</section>
