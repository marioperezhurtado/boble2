<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import Avatar from "$lib/ui/Avatar.svelte";
  import ContactActions from "./_components/ContactActions.svelte";
  import ContactInfo from "./_components/ContactInfo.svelte";
  import ContactDangerActions from "./_components/ContactDangerActions.svelte";
  import EditContact from "./_components/EditContact.svelte";
  import DeleteContactConfirm from "./_components/DeleteContactConfirm.svelte";

  let avatarExpanded = false;

  $: data = $page.data as PageData;
  $: contact = data.contact;
  $: isEditing = $page.url.searchParams.has("edit");
  $: isDeleting = $page.url.searchParams.has("delete");
</script>

<section class="p-6 h-full bg-zinc-50">
  <div class="flex flex-col flex-grow mx-auto max-w-md h-full">
    <div class="flex gap-4 items-center">
      <button on:click={() => (avatarExpanded = !avatarExpanded)}>
        <Avatar bind:expanded={avatarExpanded} user={contact} size="large" />
      </button>
      <div>
        <h2 class="pt-2 font-medium">{contact.alias}</h2>
        <p class="text-sm text-zinc-500">{contact.email}</p>
      </div>
    </div>

    <hr class="my-8 h-px bg-zinc-100" />

    <ContactActions {contact} />
    <ContactInfo {contact} />
    <ContactDangerActions {contact} />
  </div>
</section>

{#if isEditing}
  <EditContact />
{:else if isDeleting}
  <DeleteContactConfirm />
{/if}
