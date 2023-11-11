<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import Button from "$lib/ui/Button.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import type { PageData } from "../$types";

  let isEditing = false;

  $: data = $page.data as PageData;
  $: alias = data.contact.alias;
  $: email = data.contact.email;
</script>

<Modal backTo={$page.url.pathname}>
  <h1 class="pb-3 text-xl font-bold">Edit contact</h1>
  <p class="text-sm text-zinc-500">Change the details of your contact.</p>

  <form
    action="?/editContact"
    use:enhance={() => {
      isEditing = true;

      return async ({ update }) => {
        await update();
        isEditing = false;
      };
    }}
    method="POST"
    class="flex flex-col gap-3 pt-8"
  >
    <div>
      <Label for="alias">
        Alias
        <Input bind:value={alias} id="alias" name="alias" type="text" />
      </Label>
      <p class="pt-2 text-xs font-normal text-zinc-500">
        This is the name that will appear in your contact list.
      </p>
    </div>

    <Label for="email">
      Email address
      <Input
        bind:value={email}
        id="email"
        name="email"
        type="email"
        placeholder="your-friend@email.com"
      />
    </Label>

    {#if $page.form?.error}
      <FormError message={$page.form.error} />
    {/if}

    <Button isLoading={isEditing} type="submit" class="ml-auto">
      Save changes
    </Button>
  </form>
</Modal>
