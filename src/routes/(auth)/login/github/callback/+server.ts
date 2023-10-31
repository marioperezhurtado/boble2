import { auth, githubAuth } from "$lib/auth/auth";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { RequestHandler } from "@sveltejs/kit";
import { getUserByEmail } from "$lib/db/getUserByEmail";

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
  const storedState = cookies.get("github_oauth_state");
  const redirectTo = cookies.get("github_oauth_redirect");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const { getExistingUser, githubUser, createUser, createKey } =
      await githubAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser?.blocked) {
        throw new Error("User is blocked");
      }

      if (existingUser) return existingUser;
      if (!githubUser.email) {
        throw new Error("Email not provided");
      }

      const existingUserWithEmail = await getUserByEmail(githubUser.email);

      if (existingUserWithEmail) {
        if (!existingUserWithEmail.image) {
          await auth.updateUserAttributes(existingUserWithEmail.id, {
            image: githubUser.avatar_url
          });
        }
        // transform `UserSchema` to `User`
        const user = auth.transformDatabaseUser(existingUserWithEmail);
        await createKey(user.userId);
        return user;
      }

      const user = await createUser({
        attributes: {
          name: githubUser.login,
          email: githubUser.email,
          image: githubUser.avatar_url,
        }
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });
    locals.auth.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectTo ?? "/"
      }
    });
  } catch (e) {
    console.error(e);

    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }

    return new Response(null, {
      status: 500
    });
  }
};
