import { Title } from "solid-start";
import { Label, Input, PasswordInput } from "~/components/Form";
import { Link } from "~/components/Link";
import { AuthLayout } from "~/components/AuthLayout";
import { SocialProviders } from "~/components/SocialProviders";
import { AuthProtected } from "~/auth/Protected";

function LoginPage() {
  return (
    <AuthLayout>
      <Title>Login | BOBLE Web Chat</Title>
      <h1 class="pb-3 text-xl font-bold">Login to your account</h1>
      <p class="text-sm text-zinc-500">
        Need an account?{" "}
        <Link href="/create-account">Sign up.</Link>
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
            <input
              type="checkbox"
              id="remember"
              name="remember"
              class="mb-0.5"
              checked
            />
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

      <SocialProviders />
    </AuthLayout>
  );
}

export const { routeData, Page } = AuthProtected(LoginPage);
export default Page;
