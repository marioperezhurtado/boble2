<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { invalidateAll } from "$app/navigation";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Textarea from "$lib/ui/Textarea.svelte";
  import ProfilePreview from "./ProfilePreview.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import FormSuccess from "$lib/ui/FormSuccess.svelte";
  import type { PageData } from "../$types";

  $: data = $page.data as PageData;
  let name = $page.data.user.name;
  let status = $page.data.user.status ?? "";
  $: untouched = name === data.user.name && status === (data.user.status ?? "");

  const updateProfile = trpc($page).user.edit.createMutation({
    retry: false,
    onSuccess: async () => {
      await invalidateAll();
    },
  });

  function handleUpdateProfile() {
    $updateProfile.mutate({ name, status: !!status ? status : null });
  }

  function handleCancel() {
    name = data.user.name;
    status = data.user.status ?? "";
    $updateProfile.reset();
  }

  $: validationErrors = $updateProfile.error?.data?.validationErrors;
  $: error = $updateProfile.error?.data?.error;
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
    on:submit|preventDefault={handleUpdateProfile}
    class="flex flex-col gap-3"
  >
    <Label for="name">
      Name
      <Input
        bind:value={name}
        id="name"
        name="name"
        type="text"
        info="This is not your username or PIN. This name will be visible to other users."
        errors={validationErrors?.name}
      />
    </Label>
    <Label for="status">
      Status
      <Textarea
        bind:value={status}
        maxLength={150}
        id="status"
        name="status"
        rows="3"
        placeholder="What are you up to?"
        info="Let other users know what you are up to."
        errors={validationErrors?.status}
      />
    </Label>

    {#if error}
      <FormError message={error} />
    {/if}
    {#if $updateProfile.isSuccess && untouched}
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

    {#if !untouched}
      <div class="flex gap-2 justify-end">
        <Button on:click={handleCancel} type="button" intent="secondary">
          Cancel
        </Button>
        <Button isLoading={$updateProfile.isPending} type="submit">
          Save changes
        </Button>
      </div>
    {/if}
  </form>
</section>
