import { dev } from "$app/environment";
import { githubAuth } from "$lib/auth/auth";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, cookies }) => {
  const [githubUrl, state] = await githubAuth.getAuthorizationUrl();
  // store state
  cookies.set("github_oauth_state", state, {
    httpOnly: true,
    secure: !dev,
    path: "/",
    maxAge: 60 * 60
  });
  cookies.set("github_oauth_redirect", url.href.split("redirectTo=")[1] ?? "/", {
      httpOnly: true,
      secure: !dev,
      path: "/",
      maxAge: 60 * 60
    });
  return new Response(null, {
    status: 302,
    headers: {
      Location: githubUrl.toString()
    }
  });
};
