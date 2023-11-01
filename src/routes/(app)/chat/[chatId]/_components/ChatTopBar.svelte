<script lang="ts">
  import ActionIconButton from "$lib/ui/ActionIconButton.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";

  export let name: string;
  export let email: string;
  export let image: string | null;
  export let status: string | null;
</script>

<div class="p-2 border-b bg-zinc-50 flex justify-between items-center">
  <div class="flex gap-3 items-center">
    <Avatar {name} {image} size="small" />
    <div class="flex flex-col">
      <h2 class="text-sm font-semibold">{name}</h2>
      <p class="text-xs text-gray-500">{status ?? email}</p>
    </div>
  </div>

  <div class="flex gap-2 pr-2">
    <ActionIconButton title="Search messages" icon="/icons/search.svg" />
    <ActionIconButton title="More options" icon="/icons/actions.svg" />
  </div>
</div>
