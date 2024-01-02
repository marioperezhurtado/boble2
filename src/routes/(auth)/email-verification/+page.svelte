<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import FormSuccess from "$lib/ui/FormSuccess.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let pending = false;
</script>

<svelte:head>
  <title>Verify your email address | Boble Web Chat</title>
</svelte:head>

<h1 class="pb-3 text-xl font-bold">Email verification</h1>
<p class="text-sm text-zinc-500">
  Follow the link we sent to your email address to verify your account.
</p>

<form
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
  <Button isLoading={pending} type="submit" fullWidth>
    Resend verification email
  </Button>

  {#if form?.error}
    <FormError message={form.error} />
  {/if}

  {#if form?.success}
    <FormSuccess message="Your verification link was resent." />
  {/if}
</form>
