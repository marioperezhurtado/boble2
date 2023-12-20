<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import Button from "$lib/ui/Button.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  let isAdding = false;
  let newContactEmail = $page.url.searchParams.get("createContact") || "";
</script>

<Modal title="New contact" backTo={$page.url.pathname}>
  <p class="text-sm text-zinc-500">Add a new contact to your list.</p>

  <form
    action="/contacts?/addContact"
    use:enhance={() => {
      isAdding = true;

      return async ({ update }) => {
        await update();
        isAdding = false;
      };
    }}
    method="POST"
    class="flex flex-col gap-3 pt-8"
  >
    <div>
      <Label for="alias">
        Alias
        <Input id="alias" name="alias" type="text" autofocus />
      </Label>
      <p class="pt-2 text-xs font-normal text-zinc-500">
        This is the name that will appear in your contact list.
      </p>
    </div>

    <Label for="email">
      Email address
      <Input
        bind:value={newContactEmail}
        id="email"
        name="email"
        type="email"
        placeholder="your-friend@email.com"
      />
    </Label>

    {#if $page.form?.error}
      <FormError message={$page.form.error} />
    {/if}

    <Button isLoading={isAdding} type="submit" class="ml-auto">
      Save contact
    </Button>
  </form>
</Modal>
