<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import Link from "$lib/ui/Link.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormSuccess from "$lib/ui/FormSuccess.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let form: ActionData;

  let pending = false;
</script>

<svelte:head>
  <title>Reset password | Boble Web Chat</title>
</svelte:head>

<h1 class="pb-3 text-xl font-bold">Reset your password</h1>
<p class="text-sm text-zinc-500">
  Enter your email address and we will send you a message with the instructions
  to reset your password.
</p>

<form
  action="?/startResetPassword"
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
  <Label for="email"
    >Email
    <Input id="email" name="email" type="email" />
  </Label>

  <span class="text-xs font-medium text-right text-zinc-500">
    <Link href="/support">Need help?</Link>
  </span>

  <Button isLoading={pending} type="submit" fullWidth>Send reset email</Button>

  {#if form?.error}
    <FormError message={form.error} />
  {/if}
  {#if form?.success}
    <FormSuccess message="Your password reset email has been sent." />
  {/if}
</form>
