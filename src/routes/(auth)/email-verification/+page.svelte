<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import FormSuccess from "$lib/ui/FormSuccess.svelte";

  const startEmailVerification =
    trpc.auth.startEmailVerification.createMutation();

  function handleStartEmailVerification() {
    $startEmailVerification.mutate();
  }

  $: error = $startEmailVerification.error?.data?.error;
</script>

<svelte:head>
  <title>Verify your email address | Boble Web Chat</title>
</svelte:head>

<h1 class="pb-3 text-xl font-bold">Email verification</h1>
<p class="text-sm text-zinc-500">
  Follow the link we sent to your email address to verify your account.
</p>

<div class="flex flex-col gap-3 pt-8">
  <Button
    on:click={handleStartEmailVerification}
    isLoading={$startEmailVerification.isPending}
    fullWidth
  >
    Resend verification email
  </Button>

  {#if error}
    <FormError message={error} />
  {/if}

  {#if $startEmailVerification.isSuccess}
    <FormSuccess message="Your verification link was resent." />
  {/if}
</div>
