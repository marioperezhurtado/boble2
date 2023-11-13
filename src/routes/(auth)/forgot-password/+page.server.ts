import { fail } from '@sveltejs/kit';
import { db } from '$lib/db/db';
import { eq } from 'drizzle-orm';
import { auth } from '$lib/auth/auth';
import { user as userTable } from '$lib/db/schema';
import { generatePasswordResetToken } from '$lib/db/passwordResetToken/generatePasswordResetToken';
import { isValidEmail, sendPasswordResetLink } from '$lib/utils/email';

import type { Actions } from './$types';

export const actions: Actions = {
  startResetPassword: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!isValidEmail(email)) {
      return fail(400, { error: 'Invalid email' });
    }
    try {
      const storedUser = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email));

      if (!storedUser.length) {
        return fail(400, { error: 'User does not exist' });
      }

      const user = auth.transformDatabaseUser({
        ...storedUser[0],
        emailVerified: Number(storedUser[0].emailVerified)
      });

      const token = await generatePasswordResetToken(user.userId);
      await sendPasswordResetLink(token);

      return {
        success: true
      };
    } catch (e) {
      return fail(500, { error: 'An unknown error occurred' });
    }
  }
};
