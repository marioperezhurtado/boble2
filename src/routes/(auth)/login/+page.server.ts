import { auth } from '$lib/auth/auth';
import { LuciaError } from 'lucia';
import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || email.length < 1 || email.length > 255) {
      return fail(400, { error: 'Invalid email' });
    }
    if (typeof password !== 'string' || password.length < 1 || password.length > 255) {
      return fail(400, { error: 'Invalid password' });
    }
    try {
      // Find user by key and validate password
      const key = await auth.useKey('email', email.toLowerCase(), password);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
      });

      // Set session cookie
      locals.auth.setSession(session);
      
      // Return encrypted secret so that the client can decrypt it
      // and store it locally.
      return session.user.encryptedSecret;
    } catch (e) {
      if (
        e instanceof LuciaError &&
        (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
      ) {
        // User does not exist or invalid password
        return fail(400, { error: "Email or password doesn't match" });
      }
      return fail(500, { error: 'An unknown error occurred' });
    }
  }
};
