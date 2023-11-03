<script lang="ts">
  import { chatInfoOpen } from "./stores";
  import ActionIconButton from "$lib/ui/ActionIconButton.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";

  export let name: string;
  export let email: string;
  export let image: string | null;
  export let status: string | null;
</script>

<div class="flex gap-2 justify-between items-center p-2 border-b bg-zinc-50">
  <button
    on:click|stopPropagation={() => ($chatInfoOpen = true)}
    class="flex flex-grow gap-3 items-center text-left"
  >
    <Avatar {name} {image} size="small" />
    <div>
      <h2 class="text-sm font-semibold">{name}</h2>
      <p class="text-xs text-zinc-500 line-clamp-1">
        {#if status?.length}
          ~{status}
        {:else}
          {email}
        {/if}
      </p>
    </div>
  </button>

  <div class="flex gap-2">
    <ActionIconButton title="Search messages" icon="/icons/search.svg" />
    <ActionIconButton title="More options" icon="/icons/actions.svg" />
  </div>
</div>
