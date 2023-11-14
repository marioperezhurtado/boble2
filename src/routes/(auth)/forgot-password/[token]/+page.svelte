<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import PasswordInput from "$lib/ui/PasswordInput.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let form: ActionData;

  let pending = false;
</script>

<h1 class="pb-3 text-xl font-bold">Reset password</h1>
<p class="text-sm text-zinc-500">
  Change your password below. Don't forget to save it.
</p>

<form
  action="?/resetPassword"
  method="post"
  use:enhance={() => {
    pending = true;
    return async ({ update }) => {
      await update();
      pending = false;
    };
  }}
  class="flex flex-col gap-3 pt-8"
>
  <Label for="newPassword"
    >New password
    <PasswordInput id="password" name="password" />
  </Label>
  <Label for="confirmPassword">
    Confirm password
    <PasswordInput id="confirmPassword" name="confirmPassword" />
  </Label>

  <Button isLoading={pending} type="submit" fullWidth>Reset password</Button>

  {#if form?.error}
    <FormError message={form.error} />
  {/if}
</form>
