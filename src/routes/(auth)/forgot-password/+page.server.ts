import { fail } from '@sveltejs/kit';
import { auth } from '$lib/auth/auth';
import { generatePasswordResetToken } from '$lib/db/passwordResetToken/generatePasswordResetToken';
import { isValidEmail } from '$lib/email/email';
import { sendPasswordResetLink } from '$lib/email/sendPasswordResetLink';
import { getUserByEmail } from '$lib/db/user/getUserByEmail';
import type { Actions } from './$types';

export const actions: Actions = {
  startResetPassword: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!isValidEmail(email)) {
      return fail(400, { error: 'Invalid email' });
    }
    try {
      const storedUser = await getUserByEmail(email);

      if (!storedUser) {
        return fail(400, { error: 'User does not exist' });
      }

      const user = auth.transformDatabaseUser({
        ...storedUser,
        emailVerified: Number(storedUser.emailVerified)
      });

      const token = await generatePasswordResetToken(user.userId);
      await sendPasswordResetLink({
        name: user.name,
        email: user.email,
        token
      });

      return { success: true };
    } catch (e) {
      return fail(500, { error: 'An unknown error occurred' });
    }
  }
};
