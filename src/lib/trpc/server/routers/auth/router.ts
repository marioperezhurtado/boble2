import { createTRPCRouter } from "$lib/trpc/server/trpc";
import { login } from "./login";
import { createAccount } from "./createAccount";
import { startPasswordReset } from "./startPasswordReset";
import { resetPassword } from "./resetPassword";
import { verifyEmail } from "./verifyEmail";
import { resendEmailVerificationCode } from "./resendEmailVerificationCode";

export const authRouter = createTRPCRouter({
  login,
  createAccount,
  verifyEmail,
  startPasswordReset,
  resetPassword,
  resendEmailVerificationCode,
})
