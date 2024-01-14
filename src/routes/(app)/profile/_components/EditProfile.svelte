<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Textarea from "$lib/ui/Textarea.svelte";
  import ProfilePreview from "./ProfilePreview.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import FormSuccess from "$lib/ui/FormSuccess.svelte";
  import type { PageData } from "../$types";

  $: data = $page.data as PageData;
  $: name = data.user.name;
  $: status = data.user.status ?? "";
  $: untouched = name === data.user.name && status === data.user.status;

  let isUpdating = false;
  let success = false;
</script>

<section
  class="flex flex-col justify-center p-6 w-full max-w-lg bg-white rounded-md border shadow-md"
>
  <h1 class="pb-3 text-xl font-bold">Profile</h1>
  <div class="flex flex-col gap-1 pb-8 text-sm text-zinc-500">
    <p>
      You are logged in as
      <span class="font-bold text-zinc-700">{data.user.email}.</span>
    </p>
    <p>Change your account settings and how other users see you.</p>
  </div>

  <form
    use:enhance={() => {
      isUpdating = true;
      success = false;

      return async ({ update }) => {
        await update({ reset: false });
        isUpdating = false;
        success = true;
      };
    }}
    action="?/editProfile"
    method="POST"
    class="flex flex-col gap-3"
  >
    <div>
      <Label for="name">
        Name
        <Input
          value={name}
          on:input={(input) => (name = input.detail)}
          id="name"
          name="name"
          type="text"
          info="This is not your username or PIN. This name will be visible to other users."
        />
      </Label>
    </div>
    <Label for="status">
      Status
      <Textarea
        value={status}
        on:input={(input) => (status = input.detail)}
        maxLength={150}
        id="status"
        name="status"
        rows="3"
        placeholder="What are you up to?"
        info="Let other users know what you are up to."
      />
    </Label>

    {#if $page.form?.error}
      <FormError message={$page.form.error} />
    {/if}
    {#if success && !isUpdating && untouched}
      <FormSuccess message="Your profile has been updated." />
    {/if}

    {#if name}
      <ProfilePreview
        {name}
        {status}
        email={data.user.email}
        image={data.user.image}
      />
    {/if}

    <Button isLoading={isUpdating} type="submit" class="ml-auto">
      Save changes
    </Button>
  </form>
</section>
