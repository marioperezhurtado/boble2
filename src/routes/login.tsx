import { signIn } from "@auth/solid-start/client";
import { Title } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { getServerSession } from "~/auth/auth";
import { Header } from "~/components/Header";
import { Label, Input, PasswordInput } from "~/components/Form";
import { Link } from "~/components/Link";
import type { JSX } from "solid-js";
import type { OAuthProviderType } from "@auth/core/providers";

export function routeData() {
  return createServerData$(
    async (_, event) => {
      const session = await getServerSession(event.request);
      const redirectTo = new URL(event.request.url).searchParams.get("redirectTo");

      if (session) throw redirect(redirectTo || '/');
    },
  );
};

export default function LoginPage() {
  return (
    <>
      <Header loggedOut />
      <Title>Login | BOBLE Web Chat</Title>
      <main class="flex flex-col gap-14 justify-center items-center pt-20 lg:flex-row lg:gap-10 lg:items-start">
        <section class="flex flex-col justify-center p-6 w-full max-w-md bg-white rounded-md border shadow-md">
          <h1 class="pb-3 text-xl font-bold">Login to your account</h1>
          <p class="text-sm text-zinc-500">
            Need an account?{" "}
            <Link href="/signup">Sign up.</Link>
          </p>

          <div class="flex flex-col gap-3 pt-8">
            <Label for="email">Email
              <Input id="email" name="email" type="email" />
            </Label>
            <Label for="password">Password
              <PasswordInput id="password" name="password" />
            </Label>

            <div class="flex justify-between items-center text-xs font-medium text-zinc-500">
              <div class="flex gap-1.5 items-center">
                <input type="checkbox" checked id="remember" name="remember" class="mb-0.5" />
                <label for="remember">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" class="p-2 w-full text-sm font-bold text-white bg-cyan-700 rounded-md shadow-sm transition hover:brightness-110 focus:outline-cyan-600">
              Login
            </button>
          </div>

          <span class="relative my-8 h-px bg-zinc-200">
            <span class="absolute top-1/2 left-1/2 px-1 text-sm bg-white -translate-x-1/2 -translate-y-1/2 text-zinc-500">or</span>
          </span>

          <div class="flex flex-col gap-2">
            <SocialProviderButton provider="google" class="border">
              Continue with Google
            </SocialProviderButton>
            <SocialProviderButton provider="github" class="text-white bg-black">
              Continue with GitHub
            </SocialProviderButton>
          </div>
        </section>
        <section class="flex gap-3 w-full max-w-md lg:pt-6">
          <img
            src="/boble.svg"
            alt="BOBLE logo"
            class="w-12 h-12"
          />
          <div>
            <h1 class="text-lg font-bold">
              <span class="tracking-wide">BOBLE </span>
              Web Chat
            </h1>
            <p class="pt-1 text-sm">
              Chat with your friends and family from any device.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

function SocialProviderButton(props: JSX.ButtonHTMLAttributes<HTMLButtonElement> & { provider: OAuthProviderType }) {
  return (
    <button
      onClick={() => signIn(props.provider)}
      {...props}
      class={`flex items-center justify-center gap-2.5 p-2 w-full rounded-md shadow-sm focus:outline-cyan-600 text-sm font-medium ${props.class}`}
    >
      <img
        src={`/icons/${props.provider}.svg`}
        alt={props.provider}
        class="w-4 h-4"
      />
      {props.children}
    </button>
  );
}
