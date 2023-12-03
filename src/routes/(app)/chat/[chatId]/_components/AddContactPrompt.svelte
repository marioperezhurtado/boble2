<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "../$types";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";

  $: data = $page.data as PageData;
  $: email = data.chat.user.email;
</script>

<div class="pt-4 mt-auto">
  <div
    class="flex flex-col flex-wrap gap-y-2 gap-x-4 justify-between items-center p-2 bg-white rounded-md shadow-sm xs:flex-row"
  >
    <p class="pl-2 text-sm font-medium text-zinc-600">
      This user is not in your contact list.
    </p>
    <ButtonLink href="/contacts?create&email={email}" size="small">
      <img
        src="/icons/add-contact-light.svg"
        alt="Add contact"
        class="w-4 h-4"
      />
      Add contact
    </ButtonLink>
  </div>
</div>
