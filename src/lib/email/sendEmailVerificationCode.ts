import { sendEmail } from "$lib/email/email";
import { render } from "svelte-email";
import EmailVerification from "$lib/email/templates/EmailVerification.svelte";

type SendEmailVerificationCodeProps = {
  name: string;
  email: string;
  code: string;
};

export async function sendEmailVerificationCode({ name, email, code }: SendEmailVerificationCodeProps) {
  return sendEmail({
    to: email,
    subject: "Verify your account",
    html: render({
      template: EmailVerification,
      props: {
        name,
        verificationCode: code,
      },
    }),
  });
}
