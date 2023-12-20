import { auth } from '$lib/auth/auth';
import { fail, redirect } from '@sveltejs/kit';
import { SqliteError } from 'better-sqlite3';
import { generateEmailVerificationToken } from '$lib/db/emailVerificationToken/generateEmailVerificationToken';
import { isValidEmail } from '$lib/email/email';
import { sendEmailVerificationLink } from '$lib/email/sendEmailVerificationLink';

import type { PageServerLoad, Actions } from './$types';
import { nanoid } from '$lib/db/nanoid';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    if (!session.user.emailVerified) redirect(302, '/email-verification');
    redirect(302, '/');
  }
  return {};
};

export const actions: Actions = {
  createAccount: async ({ request, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms');

    if (terms !== "on") {
      return fail(400, { error: 'You must agree to the terms and conditions' });
    }

    if (typeof name !== 'string' || name.length < 3 || name.length > 255) {
      return fail(400, { error: 'Invalid name' });
    }
    if (!isValidEmail(email)) {
      return fail(400, { error: 'Invalid email' });
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      return fail(400, { error: 'Invalid password' });
    }

    if (password !== confirmPassword) {
      return fail(400, { error: 'Passwords do not match' });
    }

    try {
      const user = await auth.createUser({
        userId: `u_${nanoid(8)}`,
        key: {
          providerId: 'email',
          // unique id when using "email" auth method
          providerUserId: email.toLowerCase(),
          password // hashed by Lucia
        },
        attributes: {
          name,
          email: email.toLowerCase(),
          emailVerified: Number(false),
          image: null,
          status: null,
        }
      });
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {}
      });
      locals.auth.setSession(session); // set session cookie

      const token = await generateEmailVerificationToken(user.userId);
      await sendEmailVerificationLink({ name, email, token });
    } catch (e) {
      // check for unique constraint error in user table
      if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return fail(400, { error: 'This email is already in use' });
      }
      return fail(500, { error: 'An unknown error occurred' });
    }
    // redirect to
    // make sure you don't throw inside a try/catch block!
    redirect(302, '/email-verification');
  }
};
