<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "../$types";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";

  $: data = $page.data as PageData;
  $: email = data.chat.user.email;
</script>

<div
  class="bg-white shadow-sm p-2 flex items-center justify-between rounded-md
  mt-auto"
>
  <p class="text-sm font-medium pl-2 text-zinc-600">
    This user is not in your contact list.
  </p>
  <ButtonLink href="/contacts?create&email={email}">
    <img src="/icons/add-contact-light.svg" alt="Add contact" class="w-4 h-4" />
    Add contact
  </ButtonLink>
</div>
