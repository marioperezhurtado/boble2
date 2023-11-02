<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { chatInfoOpen } from "./stores";
  import { clickOutside } from "$lib/utils/clickOutside";
  import ActionIconButton from "$lib/ui/ActionIconButton.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";
  import Button from "$lib/ui/Button.svelte";
  import type { PageData } from "../$types";

  $: data = $page.data as PageData;
  $: user = data.chat.user;

  function formatDateTime(date: Date) {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
</script>

{#if $chatInfoOpen}
  <aside
    use:clickOutside={() => ($chatInfoOpen = false)}
    in:fly={{ x: 200, duration: 300 }}
    out:fly={{ x: 200, duration: 200 }}
    class="flex absolute right-0 z-20 flex-col py-3 px-5 w-screen xs:w-80 h-full border-l bg-zinc-50"
  >
    <ActionIconButton
      on:click={() => ($chatInfoOpen = false)}
      title="Close chat info"
      icon="/icons/close.svg"
    />

    <div class="flex flex-col items-center text-center">
      <Avatar
        name={data.chat.user.name}
        image={data.chat.user.image}
        size="large"
      />
      <h2 class="pt-2 font-medium">{user.name}</h2>
      <p class="text-sm text-zinc-500">{data.chat.user.email}</p>
    </div>

    <div class="flex flex-col gap-4 pt-8">
      {#if user.status}
        <div>
          <p class="text-xs text-zinc-500">Status</p>
          <p class="text-sm font-medium">{user.status}</p>
        </div>
      {/if}

      <div>
        <p class="text-xs text-zinc-500">Last read</p>
        <p class="text-sm font-medium">
          {#if data.chat.lastReadAt}
            {formatDateTime(data.chat.lastReadAt)}
          {:else if data.chat.createdAt}
            {formatDateTime(data.chat.createdAt)}
          {/if}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-auto">
      <Button intent="dangerSecondary" fullWidth>
        <img src="/icons/block.svg" alt="Block user" class="w-4 h-4" />
        Block user
      </Button>
      <Button intent="danger" fullWidth>
        <img src="/icons/delete.svg" alt="Delete chat" class="w-4 h-4" />
        Delete chat
      </Button>
    </div>
  </aside>
{/if}
