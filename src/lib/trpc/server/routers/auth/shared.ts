import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password is too short (min 8 characters)' })
  .max(255, { message: 'Password is too long' });
