import { createTransport } from "nodemailer";
import { env } from "$env/dynamic/private";

export const transport = createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: env.SENDGRID_API_KEY,
  },
});

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export function sendEmail({ to, subject, html }: SendEmailProps) {
  return transport.sendMail({
    from: `${env.SENDER_NAME} <${env.SENDER_ADDRESS}>`,
    to,
    subject,
    html
  });
}

export function isValidEmail(maybeEmail: unknown) {
  if (typeof maybeEmail !== 'string') return false;
  if (maybeEmail.length > 255) return false;
  const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
  return emailRegexp.test(maybeEmail);
};
