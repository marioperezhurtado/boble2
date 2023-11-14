import { createTransport } from "nodemailer";
import { SENDGRID_API_KEY, SENDER_ADDRESS, SENDER_NAME } from "$env/static/private";

export const transport = createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: SENDGRID_API_KEY,
  },
});

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export function sendEmail({ to, subject, html }: SendEmailProps) {
  return transport.sendMail({
    from: `${SENDER_NAME} <${SENDER_ADDRESS}>`,
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
