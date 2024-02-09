<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import { invalidateAll } from "$app/navigation";
  import Head from "$lib/ui/Head.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import FormSuccess from "$lib/ui/FormSuccess.svelte";
  import Label from "$lib/ui/Label.svelte";
  import OtpInput from "$lib/ui/OtpInput.svelte";
  import Link from "$lib/ui/Link.svelte";

  let code = "";

  const verifyEmail = trpc.auth.verifyEmail.createMutation({
    onSuccess: async () => {
      await invalidateAll();
    },
  });

  function handleVerifyEmail() {
    $verifyEmail.mutate({ code });
  }

  $: validationErrors = $verifyEmail.error?.data?.validationErrors;
  $: error = $verifyEmail.error?.data?.error;
</script>

<Head
  title="Verify your email address | Boble Web Chat"
  description="Enter your verification code that was sent to your email address,
  and start chatting with your friends in Boble."
/>

<h1 class="pb-3 text-xl font-bold">Verify your email</h1>
<p class="text-sm text-zinc-500">
  Please enter the 6-digit verification code that was sent to your email
  address.
</p>

<form
  on:submit|preventDefault={handleVerifyEmail}
  class="flex flex-col gap-3 pt-8"
>
  <Label for="verification-code">
    Verification code
    <OtpInput
      bind:value={code}
      numberOfInputs={6}
      errors={validationErrors?.code}
    />
  </Label>

  <Button isLoading={$verifyEmail.isPending} fullWidth>Continue</Button>

  {#if error}
    <FormError message={error} />
  {/if}

  {#if $verifyEmail.isSuccess}
    <FormSuccess message="Your email was successfully verified." />
  {/if}

  <p class="mt-5 text-sm text-zinc-500">
    Didn't receive the code, or it expired?
    <Link href="?resend">Resend email</Link>
  </p>
</form>
