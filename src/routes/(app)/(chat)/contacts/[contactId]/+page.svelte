<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import Avatar from "$lib/ui/Avatar.svelte";
  import ContactOptions from "./_components/ContactOptions.svelte";
  import ContactInfo from "./_components/ContactInfo.svelte";
  import ContactDangerActions from "./_components/ContactDangerActions.svelte";

  let avatarExpanded = false;

  $: data = $page.data as PageData;
  $: contact = data.contact;
</script>

<section class="p-6 h-full bg-zinc-50">
  <div class="flex flex-col flex-grow gap-8 mx-auto max-w-md h-full">
    <div class="flex gap-4 items-center">
      <button on:click={() => (avatarExpanded = !avatarExpanded)}>
        <Avatar
          bind:expanded={avatarExpanded}
          user={{
            ...contact,
            name: `${contact.alias} (${contact.name})`,
          }}
          size="large"
        />
      </button>
      <div>
        <h2 class="font-medium">{contact.alias}</h2>
        <p class="text-sm text-zinc-500">{contact.email}</p>
      </div>
    </div>

    <hr class="h-px bg-zinc-100" />

    <ContactOptions {contact} />
    <ContactInfo {contact} />
    <ContactDangerActions {contact} />
  </div>
</section>
