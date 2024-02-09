import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password is too short (min 8 characters)' })
  .max(255, { message: 'Password is too long' })
  .refine((p) => {
    return /[a-z]/.test(p);
  }, { message: "At least one lowercase letter" })
  .refine((p) => {
    return /[A-Z]/.test(p);
  }, { message: "At least one uppercase letter" })
  .refine((p) => {
    return /[0-9]/.test(p);
  }, { message: "At least one number" })
  .refine((p) => {
    return /[^a-zA-Z0-9]/.test(p);
  }, { message: "At least one special character" });
