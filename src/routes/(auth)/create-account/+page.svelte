<script lang="ts">
  import { goto } from "$app/navigation";
  import { encryptWithPassword, generateKeys } from "$lib/utils/encryption";
  import type { ActionData } from "./$types";
  import Link from "$lib/ui/Link.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import PasswordInput from "$lib/ui/PasswordInput.svelte";
  import Button from "$lib/ui/Button.svelte";
  import SocialProviders from "../_components/SocialProviders.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let form: ActionData;

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let isCreating = false;
  let terms = false;

  async function handleCreateAccount() {
    isCreating = true;

    const { publicKey, privateKey } = await generateKeys();

    localStorage.setItem("sk", privateKey);

    const encryptedSecret = await encryptWithPassword(privateKey, password);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("publicKey", publicKey);
    formData.append("encryptedSecret", encryptedSecret);
    formData.append("terms", terms ? "on" : "off");

    await fetch("?/createAccount", {
      method: "POST",
      body: formData,
    });

    isCreating = false;
    goto("/");
  }
</script>

<svelte:head>
  <title>Create Account | Boble Web Chat</title>
</svelte:head>

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
    <Input bind:value={name} id="name" name="name" type="text" />
  </Label>
  <Label for="email">
    Email
    <Input
      bind:value={email}
      id="email"
      name="email"
      type="email"
      autocomplete="email"
    />
  </Label>
  <Label for="password">
    Password
    <PasswordInput
      bind:value={password}
      id="password"
      name="password"
      autocomplete="new-password"
    />
  </Label>
  <Label for="confirmPassword">
    Confirm password
    <PasswordInput
      bind:value={confirmPassword}
      id="confirmPassword"
      name="confirmPassword"
      autocomplete="new-password"
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

  <Button isLoading={isCreating} type="submit" fullWidth>Create account</Button>

  {#if form?.error}
    <FormError message={form.error} />
  {/if}
</form>

<SocialProviders />
