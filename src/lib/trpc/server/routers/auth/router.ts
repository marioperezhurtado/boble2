import { createTRPCRouter } from "$lib/trpc/server/trpc";
import { login } from "./login";
import { createAccount } from "./createAccount";
import { startPasswordReset } from "./startPasswordReset";
import { resetPassword } from "./resetPassword";
import { startEmailVerification } from "./startEmailVerification";

export const authRouter = createTRPCRouter({
  login,
  createAccount,
  startPasswordReset,
  resetPassword,
  startEmailVerification
})
