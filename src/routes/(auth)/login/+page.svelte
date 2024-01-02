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

  let isLoggingIn = false;
</script>

<svelte:head>
  <title>Login | Boble Web Chat</title>
</svelte:head>

<h1 class="pb-3 text-xl font-bold">Login to your account</h1>
<p class="text-sm text-zinc-500">
  Need an account?{" "}
  <Link href="/create-account">Sign up.</Link>
</p>

<form
  action="?/login"
  method="post"
  use:enhance={() => {
    isLoggingIn = true;
    return async ({ update }) => {
      await update();
      isLoggingIn = false;
    };
  }}
  class="flex flex-col gap-3 pt-8"
>
  <Label for="email">
    Email
    <Input id="email" name="email" type="email" autocomplete="email" />
  </Label>
  <Label for="password">
    Password
    <PasswordInput
      id="password"
      name="password"
      autocomplete="current-password"
    />
  </Label>

  <div
    class="flex justify-between items-center text-xs font-medium text-zinc-500"
  >
    <div class="flex gap-1.5 items-center">
      <input
        type="checkbox"
        id="remember"
        name="remember"
        class="mb-0.5"
        checked
      />
      <label for="remember">Remember me</label>
    </div>
    <Link href="/forgot-password">Forgot password?</Link>
  </div>

  <Button isLoading={isLoggingIn} type="submit" fullWidth>Login</Button>

  {#if form?.error}
    <FormError message={form.error} />
  {/if}
</form>

<SocialProviders />
