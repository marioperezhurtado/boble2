<script lang="ts">
  import { page } from "$app/stores";
  import type { Contact } from "$lib/db/contact/getContacts";
  import BlockUnblockButton from "$lib/ui/BlockUnblockButton.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";

  export let contact: Contact;
</script>

<div class="flex flex-col gap-2 mt-auto sm:flex-row">
  <BlockUnblockButton userId={contact.id} isBlocked={!!contact.isBlocked} />
  <ButtonLink
    href={$page.url.pathname + "?deleteContact=" + contact.id}
    type="submit"
    intent="danger"
    fullWidth
  >
    <img src="/icons/delete-light.svg" alt="Delete contact" class="w-4 h-4" />
    Delete contact
  </ButtonLink>
</div>
