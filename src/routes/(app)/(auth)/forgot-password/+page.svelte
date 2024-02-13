<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import { invalidateAll } from "$app/navigation";
  import Head from "$lib/ui/Head.svelte";
  import Link from "$lib/ui/Link.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormSuccess from "$lib/ui/FormSuccess.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  let email = "";

  const startPasswordReset = trpc.auth.startPasswordReset.createMutation({
    onSuccess: () => {
      email = "";
      invalidateAll();
    },
  });

  function handleStartPasswordReset() {
    $startPasswordReset.mutate({ email });
  }

  $: validationErrors = $startPasswordReset.error?.data?.validationErrors;
  $: error = $startPasswordReset.error?.data?.error;
</script>

<Head
  title="Reset password | Boble Web Chat"
  description="Reset your password for Boble Web Chat."
/>

<h1 class="pb-3 text-xl font-bold">Reset your password</h1>
<p class="text-sm text-zinc-500">
  Enter your email address and we will send you a message with the instructions
  to reset your password.
</p>

<form
  on:submit|preventDefault={handleStartPasswordReset}
  class="flex flex-col gap-3 pt-8"
>
  <Label for="email">
    Email
    <Input
      bind:value={email}
      name="email"
      type="email"
      errors={validationErrors?.email}
    />
  </Label>

  <Link href="/support" class="text-xs text-right">Need help?</Link>

  <Button isLoading={$startPasswordReset.isPending} type="submit" fullWidth>
    Send reset email
  </Button>

  {#if error}
    <FormError message={error} />
  {/if}

  {#if $startPasswordReset?.isSuccess}
    <FormSuccess message="Your password reset email has been sent." />
  {/if}
</form>
