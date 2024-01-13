import z from 'zod';

export const aliasSchema = z
  .string()
  .min(3, { message: 'Alias is too short' })
  .max(50, { message: 'Alias is too long' });
