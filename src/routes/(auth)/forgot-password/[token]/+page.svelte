<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { goto } from "$app/navigation";
  import PasswordInput from "$lib/ui/PasswordInput.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  let newPassword = "";
  let confirmNewPassword = "";

  const resetPassword = trpc.auth.resetPassword.createMutation({
    onSuccess: () => goto("/"),
  });

  function handleResetPassword() {
    $resetPassword.mutate({
      newPassword,
      confirmNewPassword,
      token: $page.params.token,
    });
  }

  $: validationErrors = $resetPassword.error?.data?.validationErrors;
  $: error = $resetPassword.error?.data?.error;
</script>

<h1 class="pb-3 text-xl font-bold">Reset password</h1>
<p class="text-sm text-zinc-500">
  Change your password. Don't forget to save it.
</p>

<form
  on:submit|preventDefault={handleResetPassword}
  class="flex flex-col gap-3 pt-8"
>
  <Label for="newPassword">
    New password
    <PasswordInput
      bind:value={newPassword}
      name="newPassword"
      errors={validationErrors?.newPassword}
    />
  </Label>
  <Label for="confirmPassword">
    Confirm password
    <PasswordInput bind:value={confirmNewPassword} name="confirmPassword" />
  </Label>

  <Button isLoading={$resetPassword.isPending} type="submit" fullWidth>
    Reset password
  </Button>

  {#if error}
    <FormError message={error} />
  {/if}
</form>
