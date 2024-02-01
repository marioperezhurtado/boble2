import { env } from "$env/dynamic/public";
import { sendEmail } from "$lib/email/email";
import { render } from "svelte-email";
import EmailVerification from "$lib/email/templates/EmailVerification.svelte";

type SendEmailVerificationLinkProps = {
  name: string;
  email: string;
  token: string;
};

export async function sendEmailVerificationLink({ name, email, token }: SendEmailVerificationLinkProps) {
  const verificationUrl = `${env.PUBLIC_SITE_URL}/email-verification/${token}`;

  return sendEmail({
    to: email,
    subject: "Verify your account",
    html: render({
      template: EmailVerification,
      props: {
        name,
        verificationUrl,
      },
    }),
  });
}
