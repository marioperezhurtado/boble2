<script lang="ts">
  import { goto } from "$app/navigation";
  import { decryptWithPassword } from "$lib/utils/encryption";
  import Link from "$lib/ui/Link.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import PasswordInput from "$lib/ui/PasswordInput.svelte";
  import Button from "$lib/ui/Button.svelte";

  let email = "";
  let password = "";
  let isLoggingIn = false;

  async function handleLogin() {
    isLoggingIn = true;

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("?/login", {
      method: "POST",
      body: formData,
    });
    const { data } = await res.json();

    // For some reason, response is wrapped in brackets and quotes
    const encryptedSecret = data.slice(2, -2);

    // Store private key locally
    const privateKey = await decryptWithPassword(encryptedSecret, password);
    localStorage.setItem("sk", privateKey);

    // Delete every derived key from other sessions
    for (const key in localStorage) {
      if (key.startsWith("dk_")) {
        localStorage.removeItem(key);
      }
    }

    isLoggingIn = false;
    goto("/");
  }
</script>

<svelte:head>
  <title>Login | Boble Web Chat</title>
</svelte:head>

<h1 class="pb-3 text-xl font-bold">Login to your account</h1>
<p class="text-sm text-zinc-500">
  Need an account?{" "}
  <Link href="/create-account">Sign up.</Link>
</p>

<form on:submit|preventDefault={handleLogin} class="flex flex-col gap-3 pt-8">
  <Label for="email">
    Email
    <Input bind:value={email} name="email" type="email" autocomplete="email" />
  </Label>
  <Label for="password">
    Password
    <PasswordInput
      bind:value={password}
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

  <!--
  {#if form?.error}
    <FormError message={form.error} />
  {/if}
  -->
</form>
