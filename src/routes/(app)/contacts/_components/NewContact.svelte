<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { goto, invalidateAll } from "$app/navigation";
  import Button from "$lib/ui/Button.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  let newContactEmail = $page.url.searchParams.get("createContact") || "";
  let alias = "";

  const addContact = trpc($page).contact.add.createMutation({
    retry: false,
    onSuccess: async (newContactId) => {
      await invalidateAll();
      goto(`/contacts/${newContactId}`);
    },
  });

  function handleAddContact() {
    $addContact.mutate({
      email: newContactEmail,
      alias,
    });
  }
</script>

<Modal title="New contact" backTo={$page.url.pathname}>
  <p class="text-sm text-zinc-500">Add a new contact to your list.</p>

  <form
    on:submit|preventDefault={handleAddContact}
    class="flex flex-col gap-3 pt-8"
  >
    <div>
      <Label for="alias">
        Alias
        <Input
          bind:value={alias}
          name="alias"
          type="text"
          autofocus
          info="This is the name that will appear in your contact list."
        />
      </Label>
    </div>

    <Label for="email">
      Email address
      <Input
        bind:value={newContactEmail}
        name="email"
        type="email"
        placeholder="your-friend@email.com"
      />
    </Label>

    {#if $addContact.isError}
      <FormError message={$addContact.error.message} />
    {/if}

    <Button isLoading={$addContact.isPending} type="submit" class="ml-auto">
      Save contact
    </Button>
  </form>
</Modal>
