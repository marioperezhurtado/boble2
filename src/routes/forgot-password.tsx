import { Title } from "solid-start";
import { Label, Input } from "~/components/Form";
import { Link } from "~/components/Link";
import { AuthLayout } from "~/components/AuthLayout";
import { AuthProtected } from "~/auth/Protected";

function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Title>Reset password | BOBLE Web Chat</Title>
      <h1 class="pb-3 text-xl font-bold">Reset your password</h1>
      <p class="text-sm text-zinc-500">
        Enter your email address and we will send you a message with the instructions to reset your password.
      </p>

      <div class="flex flex-col gap-3 pt-8">
        <Label for="email">Email
          <Input id="email" name="email" type="email" />
        </Label>

        <span class="text-xs font-medium text-right text-zinc-500">
          <Link href="/support">Need help?</Link>
        </span>

        <button type="submit" class="p-2 w-full text-sm font-bold text-white bg-cyan-700 rounded-md shadow-sm transition hover:brightness-110 focus:outline-cyan-600">
          Send Reset Email
        </button>
      </div>
    </AuthLayout>
  );
}

export const { routeData, Page } = AuthProtected(ResetPasswordPage);
export default Page;
