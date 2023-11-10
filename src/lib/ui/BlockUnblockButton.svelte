<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "./Button.svelte";

  export let userId: string;
  export let isBlocked: boolean;

  let pending = false;
</script>

{#if isBlocked}
  <form
    use:enhance={() => {
      pending = true;
      return async ({ update }) => {
        await update();
        pending = false;
      };
    }}
    action="/?/unblockUser"
    method="post"
    class="w-full"
  >
    <Button isLoading={pending} type="submit" intent="secondary" fullWidth>
      <img src="/icons/unblock.svg" alt="Unblock user" class="w-4 h-4" />
      Unblock user
    </Button>
    <input type="hidden" name="unblockUserId" value={userId} />
  </form>
{:else}
  <form
    use:enhance={() => {
      pending = true;
      return async ({ update }) => {
        await update();
        pending = false;
      };
    }}
    action="/?/blockUser"
    method="post"
    class="w-full"
  >
    <Button
      isLoading={pending}
      type="submit"
      intent="dangerSecondary"
      fullWidth
    >
      <img src="/icons/block.svg" alt="Block user" class="w-4 h-4" />
      Block user
    </Button>
    <input type="hidden" name="blockUserId" value={userId} />
  </form>
{/if}
