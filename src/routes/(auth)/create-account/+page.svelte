<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import { goto } from "$app/navigation";
  import { encryptWithPassword, generateKeys } from "$lib/utils/encryption";
  import Head from "$lib/ui/Head.svelte";
  import Link from "$lib/ui/Link.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import PasswordInput from "$lib/ui/PasswordInput.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let terms = false;
  let isCreating = false;

  const createAccount = trpc.auth.createAccount.createMutation({
    onSuccess() {
      goto("/");
    },
  });

  async function handleCreateAccount() {
    const { publicKey, privateKey } = await generateKeys();

    localStorage.setItem("sk", privateKey);

    const encryptedSecret = await encryptWithPassword(privateKey, password);

    $createAccount.mutate({
      name,
      email,
      password,
      confirmPassword,
      terms,
      publicKey,
      encryptedSecret,
    });
  }

  $: validationErrors = $createAccount.error?.data?.validationErrors;
  $: error = $createAccount.error?.data?.error;
</script>

<Head
  title="Create Account | Boble Web Chat"
  description="Create an account to start chatting with your friends in Boble."
/>

<h1 class="pb-3 text-xl font-bold">Create your account</h1>
<p class="text-sm text-zinc-500">
  Already have an account?{" "}
  <Link href="/login">Log in.</Link>
</p>

<form
  on:submit|preventDefault={handleCreateAccount}
  class="flex flex-col gap-3 pt-8"
>
  <Label for="name">
    Name
    <Input
      bind:value={name}
      id="name"
      name="name"
      type="text"
      errors={validationErrors?.name}
    />
  </Label>
  <Label for="email">
    Email
    <Input
      bind:value={email}
      id="email"
      name="email"
      type="email"
      autocomplete="email"
      errors={validationErrors?.email}
    />
  </Label>
  <Label for="password">
    Password
    <PasswordInput
      bind:value={password}
      id="password"
      name="password"
      autocomplete="new-password"
      errors={validationErrors?.password}
    />
  </Label>
  <Label for="confirmPassword">
    Confirm password
    <PasswordInput
      bind:value={confirmPassword}
      id="confirmPassword"
      name="confirmPassword"
      autocomplete="new-password"
      errors={validationErrors?.confirmPassword}
    />
  </Label>

  <div
    class="flex justify-between items-center text-xs font-medium text-zinc-500"
  >
    <div class="flex gap-1.5 items-center">
      <input
        bind:checked={terms}
        type="checkbox"
        id="terms"
        name="terms"
        class="mb-0.5"
      />
      <label for="terms">
        I agree to the{" "}
        <Link href="/terms-of-service">Terms of Service</Link>
      </label>
    </div>
    <Link href="/support">Need help?</Link>
  </div>

  {#if validationErrors?.terms}
    <FormError message={validationErrors?.terms[0]} />
  {/if}

  <Button isLoading={isCreating} type="submit" fullWidth>Create account</Button>

  {#if error}
    <FormError message={error} />
  {/if}
</form>
