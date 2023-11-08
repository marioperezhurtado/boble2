<script lang="ts">
  import Avatar from "$lib/ui/Avatar.svelte";
  import type { Contact } from "$lib/db/contact/getContacts";

  export let contact: Contact;
  export let isSelected: boolean;
</script>

<li>
  <a
    href={`/contacts/${contact.id}`}
    class="flex gap-3 items-center p-2 border-b border-r-[3px] border-r-transparent
    {isSelected ? 'bg-zinc-100 !border-r-cyan-600' : ''}"
  >
    <Avatar name={contact.name} image={contact.image} />
    <div class="flex flex-col flex-1">
      <p class="flex gap-2 items-center">
        <span class="flex-1 font-medium">
          {contact.alias}
        </span>
        <span class="text-xs text-zinc-500">({contact.name})</span>
      </p>
      <p class="text-sm text-zinc-500">
        {contact.email}
      </p>
    </div>
  </a>
</li>
