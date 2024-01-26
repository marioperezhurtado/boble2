<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { invalidateAll } from "$app/navigation";
  import Button from "./Button.svelte";

  export let userId: string;
  export let isBlocked: boolean;

  const blockUser = trpc($page).user.block.createMutation({
    onSuccess: invalidateAll,
  });

  const unblockUser = trpc($page).user.unblock.createMutation({
    onSuccess: invalidateAll,
  });

  function handleBlockUser() {
    $blockUser.mutate({ blockUserId: userId });
  }

  function handleUnblockUser() {
    $unblockUser.mutate({ unblockUserId: userId });
  }
</script>

{#if isBlocked}
  <Button
    on:click={handleUnblockUser}
    isLoading={$unblockUser.isPending}
    intent="secondary"
    fullWidth
  >
    <img src="/icons/unblock.svg" alt="Unblock user" class="w-4 h-4" />
    Unblock user
  </Button>
{:else}
  <Button
    on:click={handleBlockUser}
    isLoading={$blockUser.isPending}
    intent="dangerSecondary"
    fullWidth
  >
    <img src="/icons/block.svg" alt="Block user" class="w-4 h-4" />
    Block user
  </Button>
{/if}
