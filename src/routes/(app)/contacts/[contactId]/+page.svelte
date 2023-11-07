<script lang="ts">
  import { page } from "$app/stores";
  import { formatDateTime } from "$lib/utils/date";
  import Avatar from "$lib/ui/Avatar.svelte";
  import type { PageData } from "./$types";
  import Button from "$lib/ui/Button.svelte";

  $: data = $page.data as PageData;
  $: contact = data.contact;
</script>

<section class="p-6 h-full bg-zinc-50">
  <div class="flex flex-col flex-grow mx-auto max-w-md h-full">
    <div class="flex gap-4 items-center">
      <Avatar name={contact.name} image={contact.image} size="large" />
      <div>
        <h2 class="pt-2 font-medium">{contact.alias}</h2>
        <p class="text-sm text-zinc-500">{contact.email}</p>
      </div>
    </div>

    <hr class="my-8 h-px bg-zinc-100" />

    <div class="flex flex-col gap-2 pb-8 sm:flex-row">
      <Button intent="secondary" size="small">
        <img src="/icons/edit.svg" alt="Edit contact" class="w-4 h-4" />
        Edit contact
      </Button>
      <form action="?/openChat" method="POST">
        <input type="hidden" name="contactId" value={contact.id} />
        <Button type="submit" intent="primary" size="small">
          <img src="/icons/chat-light.svg" alt="Open chat" class="w-4 h-4" />
          Open chat
        </Button>
      </form>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <p class="text-xs text-zinc-500">Your alias</p>
        <p class="text-sm font-medium">{contact.alias}</p>
      </div>

      <div>
        <p class="text-xs text-zinc-500">Full name</p>
        <p class="text-sm font-medium">{contact.name}</p>
      </div>

      <div>
        <p class="text-xs text-zinc-500">Email</p>
        <p class="text-sm font-medium">{contact.email}</p>
      </div>

      {#if contact.status}
        <div>
          <p class="text-xs text-zinc-500">Status</p>
          <p class="text-sm font-medium">{contact.status}</p>
        </div>
      {/if}

      {#if contact.createdAt}
        <div>
          <p class="text-xs text-zinc-500">Saved at</p>
          <p class="text-sm font-medium">
            {formatDateTime(contact.createdAt)}
          </p>
        </div>
      {/if}
    </div>

    <div class="flex flex-col gap-2 mt-auto sm:flex-row">
      <Button intent="dangerSecondary" fullWidth>
        <img src="/icons/block.svg" alt="Block user" class="w-4 h-4" />
        Block user
      </Button>
      <Button intent="danger" fullWidth>
        <img src="/icons/delete.svg" alt="Delete contact" class="w-4 h-4" />
        Delete contact
      </Button>
    </div>
  </div>
</section>
