<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { goto } from "$app/navigation";
  import { decryptWithPassword } from "$lib/utils/encryption";
  import Link from "$lib/ui/Link.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import PasswordInput from "$lib/ui/PasswordInput.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  let email = "";
  let password = "";

  const login = trpc.auth.login.createMutation({
    onSuccess: async (encryptedSecret) => {
      // Decrypt secret with password
      const privateKey = await decryptWithPassword(encryptedSecret, password);

      // Store private key locally
      localStorage.setItem("sk", privateKey);

      // Delete every derived key from other sessions
      for (const key in localStorage) {
        if (key.startsWith("dk_")) {
          localStorage.removeItem(key);
        }
      }

      const redirectTo = decodeURIComponent(
        $page.url.searchParams.get("redirectTo") || "/",
      );

      goto(redirectTo);
    },
  });

  async function handleLogin() {
    $login.mutate({ email, password });
  }

  $: validationErrors = $login.error?.data?.validationErrors;
  $: error = $login.error?.data?.error;
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
    <Input
      bind:value={email}
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
      name="password"
      autocomplete="current-password"
      errors={validationErrors?.password}
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

  <Button isLoading={$login.isPending} type="submit" fullWidth>Login</Button>

  {#if error}
    <FormError message={error} />
  {/if}
</form>
