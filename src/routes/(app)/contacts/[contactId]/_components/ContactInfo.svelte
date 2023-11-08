<script lang="ts">
  import { formatDateTime } from "$lib/utils/date";
  import type { Contact } from "$lib/db/contact/getContacts";

  export let contact: Contact;
</script>

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
