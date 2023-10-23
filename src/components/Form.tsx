import { createSignal, Show, type JSX } from "solid-js";

export function Label(props: JSX.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      class="block text-sm font-medium"
      {...props}
    />
  );
}

export function Input(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      class="block py-1.5 px-2 w-full rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
      {...props}
    />
  );
}

export function PasswordInput(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
  const [showPassword, setShowPassword] = createSignal(false);

  return (
    <div class="relative">
      <Input
        type={showPassword() ? "text" : "password"}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword())}
        title={showPassword() ? "Hide password" : "Show password"}
        class="absolute right-2 top-1/2 -translate-y-1/2 w-fit"
      >
        <Show when={showPassword()}>
          <img src="/icons/eye.svg" alt="Hide password" class="w-5 h-5" />
        </Show>
        <Show when={!showPassword()}>
          <img src="/icons/eye-off.svg" alt="Show password" class="w-5 h-5" />
        </Show>
      </button>
    </div>
  );
}
