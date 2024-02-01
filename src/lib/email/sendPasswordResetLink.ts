import { env } from "$env/dynamic/public";
import { sendEmail } from "$lib/email/email";
import PasswordReset from "$lib/email/templates/PasswordReset.svelte";
import { render } from "svelte-email";

type SendPasswordResetLinkProps = {
  name: string;
  email: string;
  token: string;
};

export async function sendPasswordResetLink({ name, email, token }: SendPasswordResetLinkProps) {
  const resetUrl = `${env.PUBLIC_SITE_URL}/forgot-password/${token}`;

  return sendEmail({
    to: email,
    subject: "Reset your password",
    html: render({
      template: PasswordReset,
      props: {
        name,
        resetUrl,
      },
    }),
  });
};
