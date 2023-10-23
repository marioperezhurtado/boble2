import { Title } from "solid-start";
import { Label, Input, PasswordInput } from "~/components/Form";
import { Link } from "~/components/Link";
import { AuthLayout } from "~/components/AuthLayout";
import { SocialProviders } from "~/components/SocialProviders";
import { AuthProtected } from "~/auth/Protected";

function CreateAccountPage() {
  return (
    <AuthLayout>
      <Title>Create Account | BOBLE Web Chat</Title>
      <h1 class="pb-3 text-xl font-bold">Create your account</h1>
      <p class="text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login">Log in.</Link>
      </p>

      <div class="flex flex-col gap-3 pt-8">
        <Label for="name">Name
          <Input id="name" name="name" type="text" />
        </Label>
        <Label for="email">Email
          <Input id="email" name="email" type="email" />
        </Label>
        <Label for="password">Password
          <PasswordInput id="password" name="password" />
        </Label>
        <Label for="confirmPassword">Confirm Password
          <PasswordInput id="confirmPassword" name="confirmPassword" />
        </Label>

        <div class="flex justify-between items-center text-xs font-medium text-zinc-500">
          <div class="flex gap-1.5 items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              class="mb-0.5"
              checked
            />
            <label for="terms">
              I agree to the{" "}
              <Link href="/terms-of-service">Terms of Service</Link>
            </label>
          </div>
          <Link href="/support">Need help?</Link>
        </div>

        <button type="submit" class="p-2 w-full text-sm font-bold text-white bg-cyan-700 rounded-md shadow-sm transition hover:brightness-110 focus:outline-cyan-600">
          Create Account
        </button>
      </div>

      <SocialProviders />
    </AuthLayout>
  );
}

export const { routeData, Page } = AuthProtected(CreateAccountPage);
export default Page;
