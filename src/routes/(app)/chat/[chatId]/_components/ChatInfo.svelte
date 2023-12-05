<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { chatInfoOpen } from "./stores";
  import { clickOutside } from "$lib/actions/clickOutside";
  import { formatDateTime } from "$lib/utils/date";
  import type { PageData } from "../$types";
  import ActionIconButton from "$lib/ui/ActionIconButton.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";
  import BlockUnblockButton from "$lib/ui/BlockUnblockButton.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";

  $: data = $page.data as PageData;
  $: chat = data.chat;
  $: user = data.chat.user;

  let avatarExpanded = false;
</script>

{#if $chatInfoOpen}
  <aside
    use:clickOutside={() => ($chatInfoOpen = false)}
    in:fly={{ x: 200, duration: 300 }}
    out:fly={{ x: 200, duration: 200 }}
    class="flex absolute right-0 z-20 flex-col py-3 px-5 w-screen h-full border-l xs:w-80 bg-zinc-50"
  >
    <ActionIconButton
      on:click={() => ($chatInfoOpen = false)}
      title="Close chat info"
      icon="/icons/close.svg"
    />

    <div class="flex flex-col items-center text-center">
      <button on:click={() => (avatarExpanded = !avatarExpanded)}>
        <Avatar bind:expanded={avatarExpanded} {user} size="large" />
      </button>
      <h2 class="pt-2 font-medium">{user.alias ?? user.name}</h2>
      <p class="text-sm text-zinc-500">{user.email}</p>
    </div>

    <div class="flex flex-col gap-4 pt-8">
      {#if user.status}
        <div>
          <p class="text-xs text-zinc-500">Status</p>
          <p class="text-sm font-medium">{user.status}</p>
        </div>
      {/if}

      {#if user.joinedAt}
        <div>
          <p class="text-xs text-zinc-500">Joined at</p>
          <p class="text-sm font-medium">{formatDateTime(user.joinedAt)}</p>
        </div>
      {/if}

      <div>
        <p class="text-xs text-zinc-500">Last read</p>
        <p class="text-sm font-medium">
          {#if user.lastReadAt}
            {formatDateTime(user.lastReadAt)}
          {:else if chat.createdAt}
            {formatDateTime(chat.createdAt)}
          {/if}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-auto">
      {#if user.alias}
        <ButtonLink
          href="/contacts/{user.id}?edit"
          intent="primary"
          fullWidth
        >
          <img
            src="/icons/edit-light.svg"
            alt="Edit contact"
            class="w-4 h-4"
          />
          Edit contact
       </ButtonLink>
 
      {:else}
        <ButtonLink
          href="/contacts?create&email={user.email}"
          intent="primary"
          fullWidth
        >
          <img
            src="/icons/add-contact-light.svg"
            alt="Add contact"
            class="w-4 h-4"
          />
          Add contact
        </ButtonLink>
      {/if}

      <BlockUnblockButton userId={user.id} isBlocked={!!user.isBlocked} />
      <ButtonLink
        href={$page.url.pathname + "?delete"}
        intent="danger"
        fullWidth
      >
        <img src="/icons/delete-light.svg" alt="Delete chat" class="w-4 h-4" />
        Delete chat
      </ButtonLink>
    </div>
  </aside>
{/if}
