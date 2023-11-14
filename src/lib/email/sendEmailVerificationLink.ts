import { SITE_URL } from "$env/static/private";
import { sendEmail } from "$lib/email/email";

type SendEmailVerificationLinkProps = {
  email: string;
  token: string;
};

export async function sendEmailVerificationLink({ email, token }: SendEmailVerificationLinkProps) {
  const url = `${SITE_URL}/email-verification/${token}`;
  console.log(`Your email verification link: ${url}`);

  return sendEmail({
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Verify your email address</h1>
      <p>Click the link below to verify your email address.</p>
      <a href="${url}">Verify your email address</a>
    `,
  });
};
