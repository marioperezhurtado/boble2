<script lang="ts">
  import Avatar from "$lib/ui/Avatar.svelte";

  export let name: string;
  export let email: string;
  export let image: string | null;
  export let status: string | null;

  $: description = status?.length ? `~${status}` : email;
</script>

<div>
  <hr class="mb-5" />
  <div class="flex gap-3 items-center">
    <Avatar user={{ name, email, image }} size="small" />
    <div>
      <h2 class="text-sm font-semibold">{name}</h2>
      <p class="text-xs break-all text-zinc-500">
        {description.slice(0, 150)}
      </p>
    </div>
  </div>

  <p class="pt-4 text-xs font-normal text-zinc-500">
    This is how other users will see you.
  </p>

  <hr class="mt-5" />
</div>
