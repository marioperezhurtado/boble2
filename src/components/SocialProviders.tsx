import { signIn } from "@auth/solid-start/client";
import type { JSX } from "solid-js";
import type { OAuthProviderType } from "@auth/core/providers";

export function SocialProviders() {
  return (
    <>
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
