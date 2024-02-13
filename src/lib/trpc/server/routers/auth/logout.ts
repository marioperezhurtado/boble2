import { auth } from '$lib/auth/auth';
import { protectedProcedure } from '$lib/trpc/server/trpc';

export const logout = protectedProcedure
  .mutation(async ({ ctx }) => {
    await auth.invalidateSession(ctx.session.id);

    const sessionCookie = auth.createBlankSessionCookie();

    ctx.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });
  });
