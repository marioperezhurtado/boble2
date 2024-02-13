import { createTRPCRouter } from "$lib/trpc/server/trpc";
import { login } from "./login";
import { logout } from "./logout";
import { createAccount } from "./createAccount";
import { startPasswordReset } from "./startPasswordReset";
import { resetPassword } from "./resetPassword";
import { verifyEmail } from "./verifyEmail";
import { resendEmailVerificationCode } from "./resendEmailVerificationCode";

export const authRouter = createTRPCRouter({
  login,
  logout,
  createAccount,
  verifyEmail,
  startPasswordReset,
  resetPassword,
  resendEmailVerificationCode,
})
