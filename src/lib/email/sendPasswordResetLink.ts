import { SITE_URL } from "$env/static/private";
import { sendEmail } from "$lib/email/email";

type SendPasswordResetLinkProps = {
  email: string;
  token: string;
};

export async function sendPasswordResetLink({ email, token }: SendPasswordResetLinkProps) {
  const url = `${SITE_URL}/forgot-password/${token}`;
  console.log(`Your password reset link: ${url}`);

  return sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password.</p>
      <a href="${url}">Reset your password</a>
    `,
  });
};
