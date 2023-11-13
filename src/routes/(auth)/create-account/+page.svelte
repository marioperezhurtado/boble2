<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import Link from "$lib/ui/Link.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import PasswordInput from "$lib/ui/PasswordInput.svelte";
  import Button from "$lib/ui/Button.svelte";
  import SocialProviders from "../_components/SocialProviders.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let form: ActionData;

  let isCreating = false;
</script>

<svelte:head>
  <title>Create Account | BOBLE Web Chat</title>
</svelte:head>

<h1 class="pb-3 text-xl font-bold">Create your account</h1>
<p class="text-sm text-zinc-500">
  Already have an account?{" "}
  <Link href="/login">Log in.</Link>
</p>

<form
  action="?/createAccount"
  method="post"
  use:enhance={() => {
    isCreating = true;
    return async ({ update }) => {
      await update();
      isCreating = false;
    };
  }}
  class="flex flex-col gap-3 pt-8"
>
  <Label for="name"
    >Name
    <Input id="name" name="name" type="text" />
  </Label>
  <Label for="email"
    >Email
    <Input id="email" name="email" type="email" />
  </Label>
  <Label for="password"
    >Password
    <PasswordInput id="password" name="password" />
  </Label>
  <Label for="confirmPassword">
    Confirm Password
    <PasswordInput id="confirmPassword" name="confirmPassword" />
  </Label>

  <div
    class="flex justify-between items-center text-xs font-medium text-zinc-500"
  >
    <div class="flex gap-1.5 items-center">
      <input type="checkbox" id="terms" name="terms" class="mb-0.5" checked />
      <label for="terms">
        I agree to the{" "}
        <Link href="/terms-of-service">Terms of Service</Link>
      </label>
    </div>
    <Link href="/support">Need help?</Link>
  </div>

  <Button isLoading={isCreating} type="submit" fullWidth>Create account</Button>

  {#if form?.error}
    <FormError message={form.error} />
  {/if}
</form>

<SocialProviders />
